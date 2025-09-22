export default function Review({ review }) {
  return (
    <div className="mt-3">
      {review.map((re, index) => {
        return (
          <div key={index} className="mb-4">
            <div className="mb-2">
              <span className="text-warning fs-5">
                {'★'.repeat(re.point)}{'☆'.repeat(5 - re.point)}
              </span>
              <small className="text-secondary ms-2">({re.point}/5)</small>
            </div>
            <h6 className="fw-bold text-primary mb-2">{re.title}</h6>
            <p className="text-dark mb-3">{re.review}</p>
            <hr className="text-muted" />
          </div>
        );
      })}
    </div>
  );
}