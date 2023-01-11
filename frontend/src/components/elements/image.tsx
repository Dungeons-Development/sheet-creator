import {ImageElementInterface} from "@/types/element";

export const ImageElement = (props: {
  element: ImageElementInterface,
}) => {
  const { element } = props;

  return (
    <img src={element.url} />
  );
};

