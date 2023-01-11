import {MouseEvent as ReactMouseEvent, useEffect, useRef, useState} from "react";
import styled from "styled-components";

const Handle = styled.div`
  position: absolute;
  
  box-shadow: none;
  background: none;

  user-select: none;
`;

export const DragHandle = (props: {
  className?: string,
  onMove: (vector: DOMPoint) => void,
  children: React.ReactNode,
}) => {
  const { className, onMove, children } = props;

  const [dragging, setDragging] = useState(false);
  const positionRef = useRef(new DOMPoint(0, 0));

  const onMouseUp = (event: MouseEvent) => {
    setDragging(false);
    console.log("mouseup");
  };

  const onMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    console.log("mousedown");
    setDragging(true);
    
    positionRef.current = new DOMPoint(event.pageX, event.pageY);
  };

  const onMouseMove = (event: MouseEvent) => {
    if (!dragging) return;
    console.log("mouseMove");

    const cursorLocation = new DOMPoint(event.pageX, event.pageY);

    const diff = new DOMPoint(cursorLocation.x - positionRef.current.x, cursorLocation.y - positionRef.current.y);

    positionRef.current = cursorLocation;

    onMove(diff);
  };

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
  }, [onMouseUp, onMouseMove]);

  return (
    <Handle
      className={className}
      onMouseDown={onMouseDown}
    >
      {children}
    </Handle>
  );
};

