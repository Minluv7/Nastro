const Popup = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-[650px] max-h-[80vh] overflow-y-auto relative">
                {/* X knop om de popup te sluiten */}
                <button 
                    className="absolute top-2 right-2 text-[2rem] hover:text-red-600" 
                    onClick={onClose}
                    aria-label="Close popup"
                >
                    &times; {/* Unicode voor de X-teken */}
                </button>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Popup;
