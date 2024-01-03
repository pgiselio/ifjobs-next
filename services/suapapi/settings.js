export const SuapApiSettings = {
    CLIENT_ID: process.env.SUAP_CLIENT_ID,
    REDIRECT_URI: process.env.NODE_ENV === "development" ? "http://localhost:3000/auth/suap/" : "https://ifjobs-next.vercel.app/auth/suap/",
    SUAP_URL: "https://suap.ifrn.edu.br",
    SCOPE: "identificacao email documentos_pessoais",
}
