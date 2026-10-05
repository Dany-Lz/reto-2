function validarNombre(valor) {
  if (valor.trim() === "") {
    throw new Error("El nombre no puede estar vacío.");
  }
}

function validarCI(valor) {
  if (valor.trim() === "") {
    throw new Error("El CI no puede estar vacío.");
  }
  if (valor.length < 11) {
    throw new Error("El CI debe tener al menos 11 caracteres.");
  }
  if (isNaN(Number(valor))) {
    throw new Error("El CI solo puede contener números.");
  }
}

function validarContrasena(valor) {
  if (valor.trim() === "") {
    throw new Error("La contraseña no puede estar vacía.");
  }
}

function validarConfirmacion(valor, contrasena) {
  if (valor.trim() === "") {
    throw new Error("La confirmación no puede estar vacía.");
  }
  if (valor !== contrasena) {
    throw new Error("Las contraseñas no coinciden.");
  }
}

function obtenerError(fnValidacion, ...args) {
  try {
    fnValidacion(...args);
    return "";
  } catch (error) {
    return error.message;
  }
}

const form = document.getElementById("form-registro");
const inputNombre = document.getElementById("nombre");
const inputCI = document.getElementById("ci");
const inputContrasena = document.getElementById("contrasena");
const inputConfirmacion = document.getElementById("confirmacion");

function mostrarError(input, idSpan, mensaje) {
  const span = document.getElementById(idSpan);
  span.textContent = mensaje;
  input.classList.toggle("campo__input--error", Boolean(mensaje));
}

function validarCampo(campo) {
  const nombre = campo.name;
  const valor = campo.value;
  let error = "";

  if (nombre === "nombre") {
    error = obtenerError(validarNombre, valor);
  } else if (nombre === "ci") {
    error = obtenerError(validarCI, valor);
  } else if (nombre === "contrasena") {
    error = obtenerError(validarContrasena, valor);
  } else if (nombre === "confirmacion") {
    error = obtenerError(validarConfirmacion, valor, inputContrasena.value);
  }

  mostrarError(campo, `error-${nombre}`, error);
  return error === "";
}

function validarFormulario() {
  const campos = [inputNombre, inputCI, inputContrasena, inputConfirmacion];
  let todoOk = true;

  for (const campo of campos) {
    if (!validarCampo(campo)) {
      todoOk = false;
    }
  }

  return todoOk;
}

inputNombre.addEventListener("input", () => validarCampo(inputNombre));
inputCI.addEventListener("input", () => validarCampo(inputCI));
inputContrasena.addEventListener("input", () => validarCampo(inputContrasena));
inputConfirmacion.addEventListener("input", () =>
  validarCampo(inputConfirmacion),
);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let resultado = true;

  if (!validarFormulario()) {
    resultado = false;
  }
  if (resultado) mostrarResultado("¡Registro exitoso!");
  else mostrarResultado("Campos no válidos. Revise nuevamente.");
});

function mostrarResultado(texto) {
  const anterior = form.querySelector(".mensaje-exito");
  if (anterior) {
    anterior.remove();
  }

  const p = document.createElement("p");
  p.className = "mensaje-exito";
  p.textContent = texto;
  form.appendChild(p);
}
