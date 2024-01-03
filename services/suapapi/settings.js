export const SuapApiSettings = {
    CLIENT_ID: "QnV7n3bSqFQS4GjO6M5ZOuRrRCf1O9DgD6rUBG2w",
    REDIRECT_URI: process.env.NODE_ENV === "development" ? "http://localhost:3000/auth/suap/" : "https://ifjobs-next.vercel.app/auth/suap/",
    SUAP_URL: "https://suap.ifrn.edu.br",
    SCOPE: "identificacao email documentos_pessoais",
}
