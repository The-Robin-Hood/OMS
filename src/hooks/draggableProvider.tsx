import React from "react";

export const DraggableContext = React.createContext({
    dragging: false,
    handleDrag: (isDragging: boolean) => {},
});
const DraggableProvider = ({ children }: { children: React.ReactNode }) => {
    const [dragging, setDragging] = React.useState(false);

    const handleDrag = (isDragging: boolean) => {
        setDragging(isDragging);
    };

    return (
        <DraggableContext.Provider value={{ dragging: dragging, handleDrag: handleDrag }}>
            {children}
        </DraggableContext.Provider>
    );
};

export default DraggableProvider;
