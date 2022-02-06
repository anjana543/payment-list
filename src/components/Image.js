import styled from "styled-components";

const ImageWrapper = styled.img`
  height: ${(props) => `${props.size}px`};
  width: ${(props) => `${props.size}px`};
  border-radius: 50%;
`;

// const NoImageWrapper = styled.div`
//   height: ${(props) => `${props.size}px`};
//   width: ${(props) => `${props.size}px`};
//   border-radius: 50%;
//   background-color: #bdbdbd;
//   color: #ffffff;
//   line-height: ${(props) => `${props.size}px`};
//   font-size: ${(props) => `${props.size / 2}px`};
//   text-align: center;
// `;

const Image = ({ name, url = "", size = 25, ...others }) =>
  url !== "" ? (
    <ImageWrapper {...others} src={url} size={size} />
  ) : (
    <></>
    // <NoImageWrapper {...others} size={size}>
    //   {name?.substr(0, 1)}
    // </NoImageWrapper>
  );

export default Image;
