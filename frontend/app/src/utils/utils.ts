function validarEmail(email: string): string | null {
  if (typeof email !== 'string' || !email.trim()) {
    return "email inválido";
  }

  // Remove espaços em branco
  const emailLimpo = email.trim();

  // Verifica comprimento mínimo e máximo
  if (emailLimpo.length < 5 || emailLimpo.length > 254) {
    return "email inválido";
  }

  // Verifica se tem apenas um @
  const partes = emailLimpo.split('@');
  if (partes.length !== 2) {
    return "email inválido";
  }

  const [localPart, domainPart] = partes;

  // Valida parte local (antes do @)
  if (!localPart || localPart.length > 64) {
    return "email inválido";
  }

  // Valida domínio (depois do @)
  if (!domainPart || domainPart.length > 253) {
    return "email inválido";
  }

  // Verifica se o domínio tem pelo menos um ponto
  if (!domainPart.includes('.')) {
    return "email inválido";
  }

  // Expressão regular para validação básica
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!regexEmail.test(emailLimpo)) {
    return "email inválido";
  }

  return null; // Retorna null quando o email é válido
}

interface ResultadoValidacaoSenha {
  valido: boolean;
  erro?: string;
  detalhes?: string[];
}

function validarSenhaDetalhada(senha: string): ResultadoValidacaoSenha {
  const erros: string[] = [];

  if (typeof senha !== 'string' || !senha.trim()) {
    return { 
      valido: false, 
      erro: "senha inválida",
      detalhes: ["Senha não pode estar vazia"]
    };
  }

  const senhaLimpa = senha.trim();

  if (senhaLimpa.length < 6) {
    erros.push("Mínimo 6 caracteres");
  }

  if (senhaLimpa.length > 128) {
    erros.push("Máximo 128 caracteres");
  }

  if (!/[A-Z]/.test(senhaLimpa)) {
    erros.push("Pelo menos uma letra maiúscula");
  }

  if (!/[a-z]/.test(senhaLimpa)) {
    erros.push("Pelo menos uma letra minúscula");
  }

  if (!/\d/.test(senhaLimpa)) {
    erros.push("Pelo menos um número");
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(senhaLimpa)) {
    erros.push("Pelo menos um caractere especial");
  }

  if (/\s/.test(senhaLimpa)) {
    erros.push("Não pode conter espaços");
  }

  if (erros.length > 0) {
    return {
      valido: false,
      erro: "senha inválida",
      detalhes: erros
    };
  }

  return { valido: true };
}

export { validarEmail, validarSenhaDetalhada};

interface ResultadoValidacao {
  valido: boolean;
  erro?: string;
  detalhes?: string[];
}

function validarTelefone(telefone: string): ResultadoValidacao {
  const erros: string[] = [];

  if (typeof telefone !== 'string' || !telefone.trim()) {
    return { valido: false, erro: "telefone inválido", detalhes: ["Telefone não pode estar vazio"] };
  }

  const telLimpo = telefone.trim();

  // Remove espaços, traços, parênteses, etc.
  const telNumeros = telLimpo.replace(/\D/g, '');

  // Verifica comprimento mínimo e máximo
  if (telNumeros.length < 10 || telNumeros.length > 11) {
    erros.push("Telefone deve ter 10 ou 11 dígitos (DDD + número)");
  }

  // Valida apenas números
  if (!/^\d+$/.test(telNumeros)) {
    erros.push("Telefone deve conter apenas números");
  }

  if (erros.length > 0) {
    return { valido: false, erro: "telefone inválido", detalhes: erros };
  }

  return { valido: true };
}
