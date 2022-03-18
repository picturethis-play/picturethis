defmodule PictureThisWeb.PageController do
  use PictureThisWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html",
      user_token:
        Phoenix.Token.sign(PictureThisWeb.Endpoint, "user socket", Cursor.Names.generate())
    )
  end
end
