// =============================================================
// Rumbo — main.js
//
// 1) Abrir/cerrar el menú en móvil (necesario: no se puede
//    lograr con CSS puro sin usar trucos poco legibles).
// 2) Validación básica del formulario de contacto (opcional:
//    se puede quitar si el equipo decide que no hace falta
//    todavía, ya que aún no hay backend real que reciba los
//    datos).
// =============================================================

(function () {
  "use strict";

  // -------------------------------------------------------------
  // 1) MENÚ MÓVIL
  // Busca el botón hamburguesa (#navToggle) y el menú (#primaryNav).
  // Al hacer clic, se agrega/quita la clase "is-open" al menú,
  // que es la que el CSS usa para mostrarlo u ocultarlo
  // (ver .primary-nav.is-open en styles.css).
  // -------------------------------------------------------------
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      // classList.toggle() devuelve true si la clase quedó
      // agregada (menú abierto) o false si quedó quitada (cerrado).
      var isOpen = nav.classList.toggle("is-open");

      // Esto es solo para accesibilidad: le dice a lectores de
      // pantalla si el menú está expandido o no.
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // -------------------------------------------------------------
  // 2) VALIDACIÓN DEL FORMULARIO DE CONTACTO (opcional)
  // Por ahora el formulario no envía nada a ningún servidor
  // (todavía no existe el backend). Esto solo revisa que los
  // campos obligatorios estén llenos y muestra un mensaje.
  // Cuando el backend (web-services) esté listo, aquí se
  // reemplaza el "TODO" de abajo por un fetch() real.
  // -------------------------------------------------------------
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", function (event) {
      // Evita que el navegador recargue la página al enviar.
      event.preventDefault();

      // checkValidity() usa las reglas "required" del HTML
      // (name, email, mensaje) para revisar si está todo completo.
      if (!form.checkValidity()) {
        status.textContent = "Revisa que todos los campos estén completos.";
        return;
      }

      // TODO: cuando exista el endpoint del backend, reemplazar
      // esto por algo como:
      // fetch("https://api.rumbo.pe/contacto", { method: "POST", ... })
      status.textContent = "¡Gracias! Te contactaremos pronto.";
      form.reset();
    });
  }
})();
