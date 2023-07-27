// import React from "react";


// const AdminDashboard: React.FC = () => {
//   return (
//     <div>
//       <h2>Welcome to the Admin Dashboard!</h2>
//       {/* Agrega aquí la lógica y los componentes que necesites para la funcionalidad del administrador */}
//       {/* Por ejemplo, formularios para agregar y editar productos, manejo de usuarios, etc. */}
//     </div>
//   );
// };

// export default AdminDashboard;
import React from "react";
import "./styles.module.css"; // Importar el archivo CSS que creamos con el nuevo nombre

const AdminPage: React.FC = () => {
  return (
    <div className="container">
      <h2>Welcome to the Admin Dashboard!</h2>
      {/* Agrega aquí la lógica y los componentes que necesites para la funcionalidad del administrador */}
      {/* Por ejemplo, formularios para agregar y editar productos, manejo de usuarios, etc. */}

      {/* Ejemplo de formulario para agregar un producto */}
      <div className="formContainer">
        <h3>Add Product</h3>
        <form>
          <div className="inputContainer">
            <label className="inputLabel">Title</label>
            <input className="input" type="text" />
          </div>
          <div className="inputContainer">
            <label className="inputLabel">Description</label>
            <input className="input" type="text" />
          </div>
          <div className="inputContainer">
            <label className="inputLabel">Price</label>
            <input className="input" type="number" />
          </div>
          <div className="inputContainer">
            <label className="inputLabel">Image URL</label>
            <input className="input" type="text" />
          </div>
          <button className="button" type="submit">Add Product</button>
        </form>
      </div>

      {/* Ejemplo de sección con tabla de productos */}
      <div className="section">
        <h3>Product List</h3>
        <div className="tableContainer">
          <table className="table">
            <thead>
              <tr className="tableHeader">
                <th className="tableCell">ID</th>
                <th className="tableCell">Title</th>
                <th className="tableCell">Price</th>
                <th className="tableCell">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="tableRow">
                <td className="tableCell">1</td>
                <td className="tableCell">Product 1</td>
                <td className="tableCell">$19.99</td>
                <td className="tableCell">
                  <button className="button">Edit</button>
                  <button className="button">Delete</button>
                </td>
              </tr>
              {/* Agrega más filas según los productos */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Agrega más secciones, formularios, tablas o componentes según tus necesidades */}
    </div>
  );
};

export default AdminPage;

