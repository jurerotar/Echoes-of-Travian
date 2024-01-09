import React, { Suspense } from 'react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';
import { CloseButton } from 'app/components/buttons/close-button';
import { SectionHeading } from 'app/components/section-heading';

type ModalProps = ReactModalProps & {
  closeHandler: () => void;
  title?: string;
  hasTitle?: boolean;
};

export const Modal: React.FC<ModalProps> = (props) => {
  const { isOpen = false, closeHandler, hasTitle, title, children, ...rest } = props;

  return (
    <Suspense fallback={null}>
      <ReactModal
        {...rest}
        isOpen={isOpen}
        overlayClassName="flex justify-center items-center fixed left-0 top-0 z-20 h-screen w-screen backdrop-brightness-50 transition-opacity duration-300"
        className="max-w-[600px] bg-white"
        shouldCloseOnOverlayClick
        onRequestClose={closeHandler}
        appElement={document.getElementById('root') as HTMLElement}
      >
        <div className="relative h-full w-full">
          {/* Modal header */}
          {hasTitle && (
            <div className="mb-2 border-b border-gray-300">
              {/* Modal title */}
              <div className="flex max-w-[90%] items-center pb-2">
                <SectionHeading>{title}</SectionHeading>
              </div>
            </div>
          )}
          {/* Close button */}
          <div className="absolute right-0 top-0">
            <CloseButton onClick={closeHandler} />
          </div>
          {children}
        </div>
      </ReactModal>
    </Suspense>
  );
};