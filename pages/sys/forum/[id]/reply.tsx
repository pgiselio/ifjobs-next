import { useParams, useSearchParams } from "next/navigation";

export default function NewAnswerForm() {
  let params = useSearchParams();

    return(
        <h1>Escrever nova resposta para ID: {params.get("id")}</h1>
    )
}