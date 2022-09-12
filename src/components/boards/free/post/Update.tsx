import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import styled, { css } from 'styled-components';

import { getCategories } from '../functions/GetCategories';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-divs: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 1150px;
  width: 100%;
  padding: 70px 100px;
  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.media.tablet} {
    padding: 50px 50px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 40px 20px 60px 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.size.md};
  user-select: none;
`;

const Content = css`
  margin-top: 15px;
  padding-left: 12px;
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.fonts.size.base};
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

const TitleInput = styled.input.attrs({ type: 'text', required: true })`
  ${Content}
  width: 100%;
  height: 40px;
`;

const Textarea = styled.textarea.attrs({ required: true })`
  ${Content}
  width: 100%;
  height: 600px;
  padding-top: 10px;
  resize: none;
  ${({ theme }) => theme.media.mobile} {
    height: 400px;
  }
`;

const TagList = styled.div`
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.size.md};
  user-select: none;
  margin-bottom: 30px;
`;

const Tags = styled.div`
  margin-top: 15px;
  ${({ theme }) => theme.media.mobile} {
    margin-top: 5px;
    max-width: 100vw;
    height: 30px;
    overflow: auto;
    white-space: nowrap;
  }
  ${({ theme }) => theme.media.tablet} {
    max-width: 100vw;
    height: 30px;
    overflow: auto;
    white-space: nowrap;
  }
  scrollbar-width: 0;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const TagLabel = styled.label<{ check: boolean }>`
  margin-right: 25px;
  padding: 5px 40px;
  font-size: ${({ theme }) => theme.fonts.size.xs};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  border-radius: 12px;
  cursor: pointer;
  ${({ theme }) => theme.media.mobile} {
    padding: 5px 15px;
    margin-right: 12px;
  }
  :hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
  background-color: ${({ check, theme }) =>
    check ? theme.colors.primary : theme.colors.gray100};
  color: ${({ check, theme }) => check && theme.colors.white};
`;

const Tag = styled.input`
  appearance: none;
`;

const ButtonDiv = styled.div`
  margin: auto;
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

const Button = styled.button`
  width: 260px;
  height: 50px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fonts.size.base};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

function Update(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [categoryList, setCategoryList] = useState<[]>();
  const [cookies] = useCookies(['X-AUTH-TOKEN']);
  const navigate = useNavigate();
  
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(window.confirm('게시글 수정을 완료하시겠습니까?')) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('text', text);
      if (category === '') {
        formData.append('category', '기타');
      } else {
        formData.append('category', category);
      }

      axios({
        url: '',
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
        },
        data: formData,
      })
        .then((res) => {
          if (res.data.successful) navigate('/board-free/boards?page=1');
        })
        .catch((err) =>
          // 에러 처리
          console.log(err)
        );
      }
  };

  useEffect(() => {
    getCategories(cookies['X-AUTH-TOKEN']).then((res) => {
      setCategoryList(res);
    });
  }, []);

  return (
    <Container>
      <Wrapper>
        <Form onSubmit={onSubmitHandler}>
          <TagList>
            태그
            <Tags>
              {categoryList?.map((item, idx) => {
                return (
                  <TagLabel
                    key={categoryList.indexOf(item)}
                    check={category === categoryList[idx]}
                  >
                    {item}
                    <Tag
                      type="radio"
                      name="category"
                      value={item}
                      onChange={(e) => setCategory(e.currentTarget.value)}
                    />
                  </TagLabel>
                );
              })}
            </Tags>
          </TagList>
          <Label>
            제목
            <TitleInput
              type="text"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
              placeholder="제목을 입력해주세요."
            />
          </Label>
          <Label>
            내용
            <Textarea
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              placeholder="건의 내용을 입력해주세요."
            />
          </Label>
          <ButtonDiv>
            <Button type="submit">작성완료</Button>
          </ButtonDiv>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Update;