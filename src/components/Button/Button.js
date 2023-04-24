export default function Button({ buttonType, buttonClass, buttonLabel }) {
  return (
    <>
      <button type={buttonType} className={buttonClass}>
        {buttonLabel}
      </button>
    </>
  );
}
