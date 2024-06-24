export default async (req, res, next) => {
  return res.status(500).send("Erro interno no servidor. Contate o suporte.");
};
