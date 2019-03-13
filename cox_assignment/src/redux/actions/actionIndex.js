import { ADD_ARTICLE } from "../constants/actions-types";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}