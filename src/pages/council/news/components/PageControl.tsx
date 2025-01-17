import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PagingProps } from '../PagingProps';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

const Arrow = styled.svg``;

const Indexes = styled.ol`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Index = styled.li<{ cur: boolean }>`
  margin: 0px 7.5px;
  font-weight: ${(props) => (props.cur ? '500' : '300')};
`;

function PageControl({
  currentPage,
  pagingInfo,
}: {
  currentPage: number;
  pagingInfo: PagingProps;
}) {
  const [pageCount, setPageCount] = useState(0);
  const url = (page: number) => `/council-news?page=${page}`;

  useEffect(() => {
    setPageCount(Math.ceil(pagingInfo.totalElements / pagingInfo.size));
  }, [pagingInfo.totalElements]);

  return (
    <Container>
      {currentPage !== 1 && (
        <Link to={url(currentPage - 1)}>
          <Arrow
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            height="24"
            width="24"
          >
            <path d="M28.05 36 16 23.95 28.05 11.9 30.2 14.05 20.3 23.95 30.2 33.85Z" />
          </Arrow>
        </Link>
      )}
      <Indexes>
        {Array.from({ length: pageCount }, (_, i) => (
          <Index cur={i + 1 === currentPage} key={i}>
            <Link to={url(i + 1)}>{i + 1}</Link>
          </Index>
        ))}
      </Indexes>
      {currentPage !== pageCount && (
        <Link to={url(currentPage + 1)}>
          <Arrow
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            height="24"
            width="24"
          >
            <path d="M18.75 36 16.6 33.85 26.5 23.95 16.6 14.05 18.75 11.9 30.8 23.95Z" />
          </Arrow>
        </Link>
      )}
    </Container>
  );
}

export default PageControl;
