import { MessageCircle } from "lucide-react";

/** Aviso informativo al final de la lista (sin enlaces: los invitados ya tienen nuestros números). */
export function ChangeNotice() {
  return (
    <section className="mt-12 rounded-3xl bg-forest p-6 text-center text-primary-foreground shadow-soft">
      <p className="leading-relaxed">
        ¿Necesitas cambiar o cancelar tu elección? Escríbenos por WhatsApp para que podamos actualizar la
        disponibilidad de la lista. ¡Gracias por ayudarnos a mantenerla organizada!
      </p>
      {/* Solo visual: no es un botón ni un enlace */}
      <div className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cream px-6 py-3 font-bold text-forest">
        <MessageCircle className="h-5 w-5" aria-hidden /> Escríbenos por WhatsApp
      </div>
    </section>
  );
}
