const Contact = () => {
    return (
      <div className="container mt-5">
        <h2>Свяжитесь с нами</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Ваше имя</label>
            <input type="text" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Ваш email</label>
            <input type="email" className="form-control" required />
          </div>
          <button type="submit" className="btn btn-success">Отправить</button>
        </form>
      </div>
    );
  };
  
  export default Contact;
  