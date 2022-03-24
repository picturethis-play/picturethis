defmodule PictureThisWeb.GameChannel do
  alias PictureThisWeb.Presence
  alias PictureThis.GameServer
  use PictureThisWeb, :channel
  require Logger

  intercept(["start-game"])

  @impl true
  def join("game:" <> id, _payload, socket) do
    Phoenix.PubSub.subscribe(PictureThis.PubSub, "game:" <> id)
    player_id = generate_player_id()
    Logger.debug("player #{player_id} joined game #{id}")

    {:ok,
     socket
     |> assign(:is_drawing?, false)
     |> assign(:player_id, generate_player_id())
     |> assign(:game_id, id)}
  end

  def join(topic, _payload, socket) do
    IO.inspect(topic, label: :topic)
    {:ok, socket}
  end

  def generate_player_id() do
    :crypto.strong_rand_bytes(16)
    |> Base.encode64(padding: false)
  end

  @impl true
  def handle_info({:game_started, %{drawer: drawer} = payload}, socket) do
    broadcast(socket, "start-round", payload)
    IO.inspect(socket.assigns.player_id, label: :info)
    IO.inspect(drawer, label: :info_drawer)

    if socket.assigns.player_id == drawer do
      Logger.debug("setting is_drawing true")
      push(socket, "prompt", payload)
      {:noreply, assign(socket, :is_drawing?, true)}
    else
      {:noreply, socket}
    end
  end

  def handle_info("round-over", socket) do
    broadcast(socket, "round-over", %{})
    {:noreply, socket}
  end

  def handle_info({:winner, %{player_id: player_id} = payload}, socket) do
    broadcast(socket, "winner", payload)
    {:noreply, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true

  def handle_in("draw", payload, socket) do
    broadcast(socket, "draw-replay", payload)
    {:noreply, assign(socket, :is_drawing?, true)}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (game:gameId).
  def handle_in("guess", payload, socket) do
    broadcast(socket, "guess-message", payload)

    guess =
      payload["userInput"]
      |> String.trim()
      |> String.downcase()

    IO.inspect(guess)
    GameServer.guess(socket.assigns.game_id, guess, socket.assigns.player_id)
    {:noreply, socket}
  end

  def handle_in("clear", payload, socket) do
    broadcast(socket, "clear-game", payload)
    {:noreply, socket}
  end

  def handle_in("start", payload, socket) do
    broadcast(socket, "start-game", payload)
    GameServer.start_game(socket.assigns.game_id)
    {:noreply, socket}
  end

  def handle_in("join-game", payload, socket) do
    GameServer.join(socket.assigns.game_id, socket.assigns.player_id)
    broadcast(socket, "joined", payload)
    {:noreply, socket}
  end

  @impl true
  def handle_out("draw-replay", payload, socket) do
    unless socket.assigns.is_drawing? do
      Logger.debug("replay")
    end

    {:noreply, socket}
  end

  def handle_out("start-round", payload, socket) do
    {:noreply, socket}
  end

  def handle_out("guess-message", payload, socket) do
    Logger.debug("guess-message")
    {:noreply, socket}
  end

  def handle_out("clear-game", _payload, socket) do
    Logger.debug("clear-game")
    {:noreply, socket}
  end

  def handle_out("start-game", payload, socket) do
    Logger.debug("start-game")
    {:noreply, socket}
  end

  def handle_out("joined", payload, socket) do
    Logger.debug("joined")
    {:noreply, socket}
  end

  def handle_out("round-over", payload, socket) do
    Logger.debug("round-over")
    {:noreply, socket}
  end

  def handle_out("winner", payload, socket) do
    Logger.debug("winner")
    {:noreply, socket}
  end
end
