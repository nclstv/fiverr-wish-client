function Textarea({ children }) {
  const handleChange = (e) => {
    console.log(e);
  };

  return (
    <div className="input-group bg-white">
      <textarea placeholder=" " onChange={handleChange} rows={3} />
      <label className="label">{children}</label>
    </div>
  );
}

export default Textarea;
