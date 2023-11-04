'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from 'react';
import { useOverlayTriggerState } from 'react-stately';
import { GetVisualMedia } from '@/types/definitions';
import { AnimatePresence } from 'framer-motion';
import { Modal } from '@/components/Modal';
import { VisualMediaDialog } from '@/components/VisualMediaDialog';
import VisualMediaSlider from '@/components/VisualMediaSlider';

export interface VisualMediaModalType {
  visualMedia: GetVisualMedia[];
  initialSlide: number;
}

const VisualMediaModalContextApi = createContext<{
  show: () => void;
  setModal: Dispatch<SetStateAction<VisualMediaModalType>>;
}>({
  show: () => {},
  setModal: () => {},
});

function VisualMediaModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const state = useOverlayTriggerState({});
  const [modal, setModal] = useState<VisualMediaModalType>({
    visualMedia: [],
    initialSlide: 0,
  });
  const memoizedContextApiValue = useMemo(
    () => ({
      show: state.open,
      setModal,
    }),
    [],
  );

  return (
    <VisualMediaModalContextApi.Provider value={memoizedContextApiValue}>
      {children}
      <AnimatePresence>
        {state.isOpen && (
          <Modal state={state}>
            <VisualMediaDialog>
              <VisualMediaSlider {...modal} onClose={state.close} />
            </VisualMediaDialog>
          </Modal>
        )}
      </AnimatePresence>
    </VisualMediaModalContextApi.Provider>
  );
}

export { VisualMediaModalContextApi, VisualMediaModalContextProvider };
