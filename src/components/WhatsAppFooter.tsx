export function WhatsAppFooter({ url }: { url?: string }) {
  return (
    <footer className="bg-sand/60 px-4 py-12 text-center">
      <p className="mx-auto max-w-2xl text-muted">
        ¿Necesitas cambiar o cancelar tu elección? Escríbenos por WhatsApp para que podamos actualizar la
        disponibilidad de la lista. ¡Gracias por ayudarnos a mantenerla organizada!
      </p>
      {url ? (
        <a href={url} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full bg-[#25D366] px-6 py-3 font-bold text-white">
          Escribir por WhatsApp
        </a>
      ) : (
        <div className="mt-6">
          <span className="inline-block rounded-full bg-[#25D366]/50 px-6 py-3 font-bold text-white">Escribir por WhatsApp</span>
          <p className="mt-2 text-xs text-muted">Enlace pendiente de configurar</p>
        </div>
      )}
    </footer>
  );
}
