defmodule Cursor.Names do
  def generate do
    title = ~w(Sir Prof Saint) |> Enum.random()

    name =
      [
        ~w(B C D F G H J K L M N P Q R S T V W X Z),
        ~w(o a i ij e ee u uu oo aj aa oe ou eu),
        ~w(b c d f g h k l m n p q r s t v w x z),
        ~w(o a i ij e ee u uu oo aj aa oe ou eu)
      ]
      |> Enum.map_join(fn x -> Enum.random(x) end)

    "#{title} #{name}"
  end
end
