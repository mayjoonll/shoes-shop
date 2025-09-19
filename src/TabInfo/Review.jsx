import { useState } from "react";
import reviewData from "../data/review"; // 기존 데이터 import

export default function Review({ id }) {
  // 기존 리뷰 필터링
  const [reviews, setReviews] = useState(
    reviewData.filter(r => r.productId === Number(id))
  );

  const [form, setForm] = useState({
    title: "",
    review: "",
    point: 0
  });

  // 평균 별점 계산
  const avgPoint = reviews.length
    ? (reviews.reduce((sum, item) => sum + item.point, 0) / reviews.length).toFixed(1)
    : 0;

  const renderStars = (point) => "★".repeat(point);

  // 입력값 변화 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // 리뷰 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.review || form.point < 1 || form.point > 5) {
      alert("제목, 리뷰, 별점을 모두 입력해주세요 (1~5점)");
      return;
    }

    const newReview = {
      reviewId: Date.now(), // 간단하게 id 생성
      productId: Number(id),
      ...form,
      point: Number(form.point)
    };

    setReviews(prev => [newReview, ...prev]);
    setForm({ title: "", review: "", point: 0 });
  };

  return (
    <div>
      <h5>⭐ 평균 별점: {avgPoint} / 5</h5>

      {/* 리뷰 작성 폼 */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={form.title}
          onChange={handleChange}
          style={{ display: "block", marginBottom: "0.5rem" }}
        />
        <textarea
          name="review"
          placeholder="리뷰 작성"
          value={form.review}
          onChange={handleChange}
          style={{ display: "block", marginBottom: "0.5rem" }}
        />
        <input
          type="number"
          name="point"
          placeholder="별점 (1~5)"
          value={form.point}
          onChange={handleChange}
          min="1"
          max="5"
          style={{ display: "block", marginBottom: "0.5rem" }}
        />
        <button type="submit">리뷰 작성</button>
      </form>

      {/* 리뷰 목록 */}
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(item => (
            <li key={item.reviewId}>
              <strong>{renderStars(item.point)}</strong> {item.title}
              <p>{item.review}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>등록된 리뷰가 없습니다.</p>
      )}
    </div>
  );
}
