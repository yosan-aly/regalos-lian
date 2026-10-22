import { useState } from "react";
import { eventInfo } from "@/data/event";
import { useCatalog } from "@/hooks/useCatalog";
import { useMyGifts } from "@/hooks/useMyGifts";
import type { Gift } from "@/types/gift";
import { Hero } from "@/components/Hero";
import { IntroCard } from "@/components/IntroCard";
import { CategoryNav } from "@/components/CategoryNav";
import { CategorySection } from "@/components/CategorySection";
import { CatalogError, CatalogLoading } from "@/components/CatalogStatus";
import { ReserveDialog } from "@/components/ReserveDialog";
import { ChangeNotice } from "@/components/ChangeNotice";
import { AttendanceSection } from "@/components/AttendanceSection";
import { AttendanceDialog } from "@/components/AttendanceDialog";
import { useMyAttendance } from "@/hooks/useMyAttendance";
import { ATTENDANCE_ENABLED } from "@/lib/attendance";

export default function App() {
  const { state, retry, refresh, updateGift } = useCatalog();
  const { myGifts, add } = useMyGifts();
  const [choosing, setChoosing] = useState<Gift | null>(null);
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const { confirmation, save: saveConfirmation } = useMyAttendance();

  return (
    <div className="min-h-screen">
      <Hero info={eventInfo} />
      <main className="mx-auto max-w-xl px-4 pb-16">
        <IntroCard info={eventInfo} />

        {state.status === "loading" && <CatalogLoading />}
        {state.status === "error" && <CatalogError message={state.message} onRetry={retry} />}
        {state.status === "ready" && (
          <>
            <CategoryNav categories={state.categories} />
            {state.categories.map((c) => (
              <CategorySection key={c.id} category={c} myGifts={myGifts} onChoose={setChoosing} />
            ))}
          </>
        )}

        {ATTENDANCE_ENABLED && <AttendanceSection
            confirmed={confirmation}
            deadline={eventInfo.attendanceDeadline}
            onOpen={() => setAttendanceOpen(true)}
          />}

        <ChangeNotice whatsappUrl={eventInfo.whatsappUrl} />
      </main>

      <ReserveDialog
        gift={choosing}
        onClose={() => setChoosing(null)}
        onReserved={(r) => {
          updateGift(r.gift);
          add(r.gift.id, r.quantity);
        }}
        onConflict={refresh}
      />

      {ATTENDANCE_ENABLED && (
        <AttendanceDialog
          open={attendanceOpen}
          deadline={eventInfo.attendanceDeadline}
          current={confirmation}
          onClose={() => setAttendanceOpen(false)}
          onSaved={saveConfirmation}
        />
      )}
    </div>
  );
}
