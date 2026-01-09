let currentScreen = 0;
const screens = ['inicio', 'historia1', 'historia2', 'historia3', 'peinado3', 'peinado5', 'final'];
let autoAdvanceTimer = null;
let herramientasProbadas = new Set(); // Rastrear qué herramientas se han probado
const totalHerramientas = 5; // extension, rulero, tijera, maquinapelo, colitapelo

function showScreen(screenIndex) {
    // Ocultar todas las pantallas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar la pantalla actual
    const screen = document.getElementById(screens[screenIndex]);
    if (screen) {
        screen.classList.add('active');
    }
    
    currentScreen = screenIndex;
    
    // Configurar auto-avance para las historias (excepto inicio y las últimas)
    if (screenIndex > 0 && screenIndex < 3) {
        clearTimeout(autoAdvanceTimer);
        autoAdvanceTimer = setTimeout(() => {
            siguiente();
        }, 5000); // 5 segundos para avanzar automáticamente
    }
}

function comenzar() {
    showScreen(1); // Ir a historia1
}

function siguiente() {
    clearTimeout(autoAdvanceTimer);
    
    if (currentScreen < screens.length - 1) {
        showScreen(currentScreen + 1);
    }
}

function abrirModalColor() {
    const modal = document.getElementById('modal-color');
    // Asegurar que se muestre la vista de selección inicial
    document.querySelectorAll('.modal-vista').forEach(vista => {
        vista.classList.remove('active');
    });
    document.getElementById('vista-seleccion-color').classList.add('active');
    modal.classList.add('active');
}

function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
}

function elegirColor(color) {
    // Ocultar todas las vistas del modal
    document.querySelectorAll('.modal-vista').forEach(vista => {
        vista.classList.remove('active');
    });
    
    if (color === 'azul') {
        // Mostrar peinado azul dentro del modal
        document.getElementById('vista-peinado-azul').classList.add('active');
    } else if (color === 'rubio') {
        // Mostrar peinado rubio dentro del modal
        document.getElementById('vista-peinado-rubio').classList.add('active');
    } else if (color === 'marron') {
        // Cerrar el modal
        cerrarModal('modal-color');
        // Cambiar el botón a "Peinados"
        const btn = document.getElementById('btn-historia3');
        btn.textContent = 'Peinados';
        btn.onclick = abrirModalPeinado;
        // Volver a la vista de selección cuando se abra de nuevo
        document.getElementById('vista-seleccion-color').classList.add('active');
    }
}

function abrirModalPeinado() {
    const modal = document.getElementById('modal-peinado');
    // Asegurar que se muestre la vista de herramientas
    document.querySelectorAll('.modal-vista').forEach(vista => {
        vista.classList.remove('active');
    });
    document.getElementById('vista-herramientas').classList.add('active');
    verificarBotonCrema();
    modal.classList.add('active');
}

function elegirHerramienta(herramienta) {
    // Marcar la herramienta como probada
    herramientasProbadas.add(herramienta);
    
    // Ocultar todas las vistas del modal
    document.querySelectorAll('.modal-vista').forEach(vista => {
        vista.classList.remove('active');
    });
    
    // Mostrar el peinado correspondiente
    const mapeoPeinados = {
        'extension': 'vista-peinado-extension',
        'rulero': 'vista-peinado-rulero',
        'tijera': 'vista-peinado-tijera',
        'maquinapelo': 'vista-peinado-maquinapelo',
        'colitapelo': 'vista-peinado-colitapelo'
    };
    
    const vistaId = mapeoPeinados[herramienta];
    if (vistaId) {
        document.getElementById(vistaId).classList.add('active');
    }
    
    // Verificar si se debe mostrar el botón crema
    verificarBotonCrema();
}

function volverAHerramientas() {
    // Ocultar todas las vistas del modal
    document.querySelectorAll('.modal-vista').forEach(vista => {
        vista.classList.remove('active');
    });
    // Mostrar la vista de herramientas
    document.getElementById('vista-herramientas').classList.add('active');
    verificarBotonCrema();
}

function verificarBotonCrema() {
    const btnCremaContainer = document.getElementById('btn-crema-container');
    if (herramientasProbadas.size >= totalHerramientas) {
        btnCremaContainer.style.display = 'block';
    } else {
        btnCremaContainer.style.display = 'none';
    }
}

function aplicarCrema() {
    // Cerrar el modal
    cerrarModal('modal-peinado');
    // Mostrar la pantalla final
    showScreen(6); // final está en el índice 6
}

// Inicializar en la pantalla de inicio
showScreen(0);

