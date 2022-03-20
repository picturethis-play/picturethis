defmodule PictureThis.GameServer do
  use GenServer

  defstruct [
    :score_board,
    :current_drawer,
    :total_rounds,
    :current_round,
    :current_prompt,
    players: [],
    status: :pending
  ]

  @impl true
  def init(args) do
    {:ok, args}
  end

  def join(pid, player_id) do
    GenServer.call(pid, {:join, player_id})
  end

  def start_game(pid) do
    GenServer.call(pid, :start)
  end

  def guess(pid, guess, player_id) do
    GenServer.call(pid, {:guess, guess, player_id})
  end

  @impl true
  def handle_call({:join, player_id}, state) do
    {:reply, :ok, %{state | players: [player_id | state.players]}}
  end

  def handle_call(:start, state) do
    # choose drawer choose prompt
    {:reply, :ok, %{state | status: :active}}
  end

  def handle_call({:guess, guess, player_id}, state) do
    if guess == state.current_prompt do
      # award points, end round, start round, add new prompt
      {:reply, true, state}
    else
      {:reply, false, state}
    end
  end
end
