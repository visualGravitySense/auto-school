const courses = [
    { id: 1, name: "Категория B", price: "500€" },
    { id: 2, name: "Категория A", price: "450€" },
    { id: 3, name: "Категория C", price: "600€" },
  ];
  
  const Courses = () => {
    return (
      <div className="container mt-5">
        <h2>Наши курсы</h2>
        <ul className="list-group">
          {courses.map(course => (
            <li key={course.id} className="list-group-item">
              {course.name} - <strong>{course.price}</strong>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Courses;
  