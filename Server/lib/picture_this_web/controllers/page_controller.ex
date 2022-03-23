defmodule PictureThisWeb.PageController do
  alias PictureThis.GameServer
  use PictureThisWeb, :controller

  def create_game(conn, _params) do
    {:ok, game_id} = GameServer.create_game()
    json(conn, %{gameId: game_id})
  end
end
