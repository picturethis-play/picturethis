defmodule PictureThisWeb.PageController do
  use PictureThisWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
