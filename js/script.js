
// Animaciones y filtro con jQuery.

if (window.jQuery) {

    $(function () {

        const duracion = matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches ? 0 : 250;

        $('main').hide().fadeIn(duracion);

        const productos = $('.product');

        const marcas = [...new Set(productos.map(function () {
            return $(this).attr('data-brand');
        }).get())];

        marcas.forEach(function (marca) {

            $('#marca').append(
                $('<option>').val(marca).text(marca)
            );

        });

        function filtrar() {

            const marca = $('#marca').val();

            const visibles = productos.filter(function () {

                return marca === 'todas' ||
                    $(this).attr('data-brand') === marca;

            });

            productos.stop(true, true).hide();

            visibles.fadeIn(duracion);

            $('#conteo').text(
                visibles.length + ' equipos en el catálogo'
            );

        }

        $('#marca').on('change', filtrar);

        if (productos.length) {
            filtrar();
        }

    });

}

// Validación del formulario con JavaScript.

const formulario = document.getElementById('contact');

if (formulario) {

    formulario.addEventListener('submit', function (evento) {

        evento.preventDefault();

        const nombre = formulario.elements.nombre.value.trim();
        const correo = formulario.elements.correo.value.trim();
        const celular = formulario.elements.celular.value.trim();
        const mensaje = formulario.elements.mensaje.value.trim();

        const errores = {

            nombre: /^[\p{L}\p{M} .'-]{2,}$/u.test(nombre)
                && /\p{L}/u.test(nombre)
                ? ''
                : 'Ingrese un nombre válido.',

            correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
                ? ''
                : 'Ingrese un correo válido.',

            celular: /^9\d{8}$/.test(celular)
                ? ''
                : 'Ingrese 9 dígitos, comenzando con 9.',

            mensaje: mensaje.length >= 10
                ? ''
                : 'Escriba al menos 10 caracteres.'

        };

        let primerError = null;

        Object.keys(errores).forEach(function (campo) {

            const input = formulario.elements[campo];
            const error = errores[campo];

            document.getElementById(
                'error-' + campo
            ).textContent = error;

            input.classList.toggle('invalido', Boolean(error));

            input.setAttribute(
                'aria-invalid', String(Boolean(error))
            );

            if (error && !primerError) {
                primerError = input;
            }

        });

        const estado = document.getElementById('status');

        estado.classList.toggle('exito', !primerError);

        estado.textContent = primerError
            ? 'Revise los campos señalados.'
            : 'Consulta validada. Demostración: no se enviaron datos.';

        if (primerError) {
            primerError.focus();
        }

    });

}
