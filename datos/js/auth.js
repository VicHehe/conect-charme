const Auth = {

    // Obtener sesión activa
    getSesion() {
        const s = sessionStorage.getItem('cc_sesion');
        return s ? JSON.parse(s) : null;
    },

    // Guardar sesión
    setSesion(usuario) {
        sessionStorage.setItem('cc_sesion', JSON.stringify(usuario));
    },

    // Cerrar sesión
    cerrarSesion() {
        sessionStorage.removeItem('cc_sesion');
        window.location.href = '/login.html';
    },

    // Verificar que hay sesión activa, si no redirige al login
    requiereLogin() {
        const s = this.getSesion();
        if (!s) window.location.href = '/login.html';
        return s;
    },

    // Verificar rol mínimo requerido
    requiereRol(rolMinimo) {
        const roles = ['alumno', 'profesor', 'subadmin', 'admin'];
        const s = this.requiereLogin();
        if (!s) return null;
        if (roles.indexOf(s.rol) < roles.indexOf(rolMinimo)) {
            alert('No tenés permiso para acceder a esta página');
            window.location.href = '/index.html';
            return null;
        }
        return s;
    },

    // Hash simple de contraseña (SHA-256)
    async hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    },

    // Formatear RUT
    formatearRut(rut) {
        return rut.replace(/\./g, '').toUpperCase().trim();
    },

    // Login
    async login(rut, password) {
        const rutFormateado = this.formatearRut(rut);
        const datos = await GitHub.leer('datos/usuarios.json');
        if (!datos) return { ok: false, error: 'Error al conectar' };

        const usuario = datos.usuarios.find(u => u.rut === rutFormateado);
        if (!usuario) return { ok: false, error: 'RUT no registrado' };

        const hash = await this.hashPassword(password);
        if (usuario.password !== hash) return { ok: false, error: 'Contraseña incorrecta' };

        this.setSesion({
            rut: usuario.rut,
            nombre: usuario.nombre,
            rol: usuario.rol
        });

        return { ok: true, rol: usuario.rol };
    },

    // Registro
    async registro(rut, nombre, password) {
        const rutFormateado = this.formatearRut(rut);
        const sha = await GitHub.sha('datos/usuarios.json');
        const datos = await GitHub.leer('datos/usuarios.json');
        if (!datos) return { ok: false, error: 'Error al conectar' };

        // Verificar si el RUT está autorizado
        const autorizado = datos.ruts_autorizados.find(r => r.rut === rutFormateado);
        if (!autorizado) return { ok: false, error: 'Tu RUT no está autorizado' };

        // Verificar si ya está registrado
        const existe = datos.usuarios.find(u => u.rut === rutFormateado);
        if (existe) return { ok: false, error: 'Este RUT ya tiene una cuenta' };

        // Verificar nombre único
        const nombreExiste = datos.usuarios.find(u => 
            u.nombre.toLowerCase() === nombre.toLowerCase()
        );
        if (nombreExiste) return { ok: false, error: 'Ese nombre ya está en uso' };

        const hash = await this.hashPassword(password);

        datos.usuarios.push({
            rut: rutFormateado,
            nombre: nombre,
            rol: autorizado.rol,
            password: hash,
            fechaRegistro: new Date().toISOString()
        });

        const ok = await GitHub.escribir('datos/usuarios.json', datos, sha);
        if (!ok) return { ok: false, error: 'Error al guardar' };

        return { ok: true };
    }
};
