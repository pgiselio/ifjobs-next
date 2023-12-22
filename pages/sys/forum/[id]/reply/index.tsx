import { useParams } from "next/navigation";

export default function NewAnswerForm() {
  let params = useParams();

    return(
        <h1>Escrever nova resposta para ID: {params.id}</h1>
    )
}