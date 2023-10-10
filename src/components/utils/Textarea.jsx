function Textarea({ children, value, setValue }) {
  return (
    <div className="input-group bg-white">
      <textarea
        placeholder=" "
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={3}
      />
      <label className="label">{children}</label>
    </div>
  );
}

export default Textarea;
