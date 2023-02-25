export interface PostProps {
  id: number;
  petitionStatus: string;
  title: string;
  commentCount: number;
  blind: boolean;
  postHits: number;
}

export interface Comment {
  id: number;
  writer: string;
  contents: string;
  createdAt: string;
}