defmodule PictureThisWeb.CursorChannel do
  alias PictureThisWeb.Presence
  alias PictureThis.GameServer
  alias PictureThis.GameSupervisor
  use PictureThisWeb, :channel
  require Logger

  @impl true
  def join("cursor:lobby", _payload, socket) do
    Phoenix.PubSub.subscribe(PictureThis.PubSub, "cursor:lobby")

    {:ok, socket |> assign(:is_drawing?, false) |> assign(:player_id, generate_player_id())} 
  end

  def generate_player_id() do
    :crypto.strong_rand_bytes(16)
    |> Base.encode64(padding: false)
  end

  @impl true

  def handle_info({:game_started, %{prompt: prompt, drawer: drawer}}, socket) do
    IO.inspect(socket.assigns.player_id, label: :info)
    IO.inspect(drawer, label: :info_drawer)

    if socket.assigns.player_id == drawer do
      Logger.debug("setting is_drawing true")
      {:noreply, assign(socket, :is_drawing?, true)}
    else
      {:noreply, socket}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("create-game", %{"name" => name}, socket) do
    id = GameServer.generate_id()
    topic = GameServer.topic(id)

    case DynamicSupervisor.start_child(
           GameSupervisor,
           {GameServer, [id, socket.assigns.player_id]}
         ) do
      {:ok, pid} ->
        Logger.debug("created game")
        Logger.debug("subscribing to #{topic}")
        Phoenix.PubSub.subscribe(PictureThis.PubSub, topic)
        GameServer.start_game(pid)
        push(socket, "game-created", %{gameId: id})
        {:noreply, socket}

      {:error, reason} ->
        # send error message to client
        Logger.error("failed to create game #{inspect(reason)}")
        {:noreply, socket}
    end
  end

  def handle_in("draw", payload, socket) do
    broadcast(socket, "draw-replay", payload)
    {:noreply, assign(socket, :is_drawing, true)}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (cursor:lobby).
  @impl true
  def handle_in("shout", payload, socket) do
    broadcast(socket, "shout", payload)
    {:noreply, socket}
  end

  def handle_out("draw-replay", payload, socket) do
    unless socket.assigns.is_drawing? do
      Logger.debug("replay")
      # push(socket, "draw-replay", payload)
    end

    {:noreply, socket}
  end

  # Add authorization logic here as required.
  # defp authorized?(_payload) do
  #   true
  # end
end
