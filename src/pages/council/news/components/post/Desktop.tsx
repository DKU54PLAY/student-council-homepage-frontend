import styled from 'styled-components';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { FiDownload } from 'react-icons/fi';
import { IoIosFolder } from 'react-icons/io';

import { NewsProps, DetailProps, FileProps } from '../../NewsProps';

const Wrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 40px 0px;
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Head = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.gray020};
  display: grid;
  grid-template-columns: ${({ isAdmin }: { isAdmin: boolean }) =>
    isAdmin ? '0.3fr 3.5fr 0.8fr 0.3fr' : '0.3fr 3.5fr 0.8fr'};
  div {
    display: flex;
    place-content: center;
    place-items: center;
    :nth-child(2) {
      justify-content: left;
    }
  }
`;

const ContentWrapper = styled.div`
  width: 90%;
  padding: 40px 35px;
`;

const Content = styled.div`
  white-space: pre-wrap;
  line-height: ${({ theme }) => theme.fonts.size.xl};
`;

const Download = styled.div`
  background-color: ${({ theme }) => theme.colors.gray040};
  width: 480px;
  height: 75px;
  margin: 120px auto 0 auto;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 0.4fr 2fr 0.3fr;
  div {
    margin: auto 0;
  }
`;

const FolderIcon = styled.div`
  text-align: right;
`;

const Data = styled.div`
  padding-left: 20px;
`;

const Name = styled.div`
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

const DownloadIcon = styled.div`
  cursor: pointer;
`;

const Svg = styled.svg`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 50%;
  margin-top: 20px;
  object-fit: contain;
`;

const ImageContainer = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
`;

function Detail() {
  const [searchParams] = useSearchParams();
  const [board, setBoard] = useState<NewsProps[]>([]);
  const [detail, setDetail] = useState<DetailProps>();
  const [, setNextList] = useState<NewsProps[]>();
  const [cookies] = useCookies(['X-AUTH-TOKEN', 'isAdmin']);
  const [isAdmin] = useState<boolean>(cookies.isAdmin === 'true');

  useEffect(() => {
    axios
      .get('/api/news')
      .then((response) => {
        const result = response.data;
        setBoard(result.content);
      })
      .catch((error) => {
        // 에러 핸들링
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const detailId = Number(searchParams.get('id'));

    if (detailId === 1) {
      setNextList(board.slice(detailId - 1, detailId + 2));
    } else {
      setNextList(board.slice(detailId - 2, detailId + 1));
    }
  }, [searchParams, board]);

  useEffect(() => {
    axios
      .get(`/api/news/${searchParams.get('id')}`)
      .then((response) => {
        const result = response.data.data;
        setDetail(result);
      })
      .catch((error) => {
        // 에러 핸들링
        console.log(error);
      });
  }, []);

  const handleDelete = (id: number) => {
    axios
      .delete(`/api/news/${id}`, {
        headers: {
          'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
        },
      })
      .then(() => {
        window.location.replace('/council-news');
      })
      .catch((error) => {
        // 에러 핸들링
        console.log(error);
      });
  };

  // 게시글 인덱스, 다음글 리스트 노출 추후에 수정
  return (
    <Wrapper>
      <Head isAdmin={isAdmin}>
        <div>제목</div>
        <div>{detail?.title}</div>
        <div>{detail?.createDate.slice(0, 10)}</div>
        {isAdmin && detail && (
          <div>
            <Svg
              width="20"
              height="20"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => handleDelete(Number(searchParams.get('id')))}
            >
              <path
                d="M12.5 31.25L18.3086 86.4277C18.4297 87.5798 18.9732 88.6461 19.8341 89.4212C20.6949 90.1962 21.8123 90.6251 22.9707 90.625H77.0293C78.1877 90.6251 79.3051 90.1962 80.1659 89.4212C81.0268 88.6461 81.5703 87.5798 81.6914 86.4277L87.5 31.25H12.5ZM60.9375 73.7227L50 62.7852L39.0625 73.7227L34.0898 68.75L45.0273 57.8125L34.0898 46.875L39.0625 41.9023L50 52.8398L60.9375 41.9023L65.9102 46.875L54.9727 57.8125L65.9102 68.75L60.9375 73.7227Z"
                fill="black"
              />
              <path
                d="M91.4062 9.375H8.59375C7.29933 9.375 6.25 10.4243 6.25 11.7188V22.6562C6.25 23.9507 7.29933 25 8.59375 25H91.4062C92.7007 25 93.75 23.9507 93.75 22.6562V11.7188C93.75 10.4243 92.7007 9.375 91.4062 9.375Z"
                fill="black"
              />
            </Svg>
          </div>
        )}
      </Head>
      <ContentWrapper>
        <Content>{detail?.text}</Content>
        {detail?.files[0] && (
          <>
            <ImageContainer>
              {detail?.files
                .filter((file) => file.url.endsWith('png' || 'jpg' || 'jpeg'))
                .map((img: FileProps, index: number) => (
                  <Image
                    key={img.id}
                    role="presentation"
                    src={detail?.files[index].url}
                    alt={detail?.files[index].url}
                  />
                ))}
            </ImageContainer>

            <Download>
              <FolderIcon>
                <IoIosFolder size="35" />
              </FolderIcon>
              <Data>
                <Name>{detail?.files[0].originName}</Name>
              </Data>
              <DownloadIcon>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={detail?.files[0].url}
                >
                  <FiDownload size="15" color="76787A" />
                </a>
              </DownloadIcon>
            </Download>
          </>
        )}
      </ContentWrapper>
    </Wrapper>
  );
}

export default Detail;