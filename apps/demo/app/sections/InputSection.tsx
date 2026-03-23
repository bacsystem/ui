'use client'

import { Input } from '@bacsystem/ui'
import { DemoSection } from '../../components/DemoSection'
import { Search, Mail, Eye, Lock, User } from 'lucide-react'

export function InputSection() {
  return (
    <div id="input">

      {/* States */}
      <DemoSection title="Input" tag="Component" description="Default, error, success, hint, and disabled states">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', width: '100%', maxWidth: 420 }}>
          <Input label="Email" placeholder="correo@ejemplo.com" />
          <Input label="Con hint" placeholder="usuario@ejemplo.com" hint="Usaremos este correo para notificaciones" />
          <Input label="Con éxito" defaultValue="christian@bacsystem.com" success="Correo verificado" />
          <Input label="Con error" defaultValue="valor inválido" error="Este campo es requerido" />
          <Input label="Deshabilitado" defaultValue="no editable" disabled />
        </div>
      </DemoSection>

      {/* Sizes */}
      <DemoSection title="Sizes" tag="Input" description="Tres tamaños: sm, md (default), lg">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', width: '100%', maxWidth: 420 }}>
          <Input label="Small" placeholder="size sm" inputSize="sm" />
          <Input label="Medium" placeholder="size md (default)" inputSize="md" />
          <Input label="Large" placeholder="size lg" inputSize="lg" />
        </div>
      </DemoSection>

      {/* Icons */}
      <DemoSection title="Icons" tag="Input" description="Icono izquierdo, derecho, o ambos">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', width: '100%', maxWidth: 420 }}>
          <Input label="Icono izquierdo" placeholder="Buscar..." iconLeft={Search} />
          <Input label="Icono derecho" placeholder="tu@email.com" iconRight={Mail} />
          <Input label="Ambos iconos" placeholder="Contraseña" iconLeft={Lock} iconRight={Eye} />
          <Input label="Icono + error" placeholder="Usuario" iconLeft={User} error="Usuario no encontrado" />
          <Input label="Icono + éxito" defaultValue="christian" iconLeft={User} success="Usuario disponible" />
        </div>
      </DemoSection>

      {/* Prefix & Suffix */}
      <DemoSection title="Prefix & Suffix" tag="Input" description="Addons de texto al inicio o al final del campo">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', width: '100%', maxWidth: 420 }}>
          <Input label="Prefijo URL" placeholder="mi-sitio" prefix="https://" suffix=".com" />
          <Input label="Precio" placeholder="0.00" prefix="S/" />
          <Input label="Peso" placeholder="70" suffix="kg" />
          <Input label="Prefijo + icono" placeholder="Buscar dominio" prefix="www." iconRight={Search} />
        </div>
      </DemoSection>

      {/* Floating Label */}
      <DemoSection title="Floating Label" tag="Input" description="Label que flota al enfocar o escribir">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', width: '100%', maxWidth: 420 }}>
          <Input label="Nombre completo" floating />
          <Input label="Email" floating iconLeft={Mail} />
          <Input label="Contraseña" floating iconLeft={Lock} iconRight={Eye} />
          <Input label="Con error" floating error="Campo requerido" />
          <Input label="Con éxito" floating defaultValue="christian@bacsystem.com" success="Email válido" />
        </div>
      </DemoSection>

    </div>
  )
}
