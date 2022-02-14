import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

import { AnimatePresence, motion } from "framer-motion";
import Rocket from "./loading-rocket.gif";
import "./styles.css";

function App() {
  const modalRef = useRef();
  const modalExaple2 = useRef();

  return (
    <div className="App">
      <button onClick={() => modalRef.current.open()}>Open Modal</button>
      <LoadingModal ref={modalRef}>
        <img alt="loading" src={Rocket} />
      </LoadingModal>
      <button onClick={() => modalExaple2.current.open()}>Open Modal</button>
      <Modal ref={modalRef}>
        <h1>Hello world</h1>
      </Modal>
    </div>
  );
}

export default App;

const Modal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(true);

  useImperativeHandle(ref, () => {
    return {
      open: () => setOpen(true),
      close: () => setOpen(false),
    };
  });

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                delay: 0.3,
              },
            }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: {
                  duration: 0.3,
                },
              }}
              exit={{
                scale: 0,
                transition: {
                  delay: 0.3,
                },
              }}
              className="modal-content-wrapper"
            >
              <motion.div
                initial={{ x: 100 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: {
                    delay: 0.3,
                    duration: 0.3,
                  },
                }}
                exit={{
                  x: 100,
                  opacity: 0,
                  transition: { duration: 0.3 },
                }}
                className="modal-content"
              >
                {props.children}
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

const LoadingModal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(true);
  const DURATION = 1.5;
  useImperativeHandle(ref, () => {
    return {
      open: () => setOpen(true),
      close: () => setOpen(false),
    };
  });

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: DURATION,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                delay: DURATION,
              },
            }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{
                y: 1000,
              }}
              animate={{
                y: 0,
                transition: {
                  duration: DURATION,
                },
              }}
              exit={{
                y: -1000,
                transition: {
                  duration: DURATION,
                },
              }}
              className="modal-content-wrapper"
            >
              <motion.div
                animate={{
                  transition: {
                    delay: DURATION,
                    duration: DURATION,
                  },
                }}
                exit={{
                  y: -1000,
                  opacity: 0,
                  transition: { duration: 1 },
                }}
                className="modal-content"
              >
                {props.children}
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
