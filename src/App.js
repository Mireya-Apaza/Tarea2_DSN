import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articulos: JSON.parse(localStorage.getItem('articulos')) || [],
      editandoArticulo: null,
      nuevoArticulo: {codigo: '', nombre: '', apellido: '', email: '', celular: '', acciones: ''}
    };
  }  

  handleChange = (e) => {
    if (this.state.editandoArticulo) {
      this.setState({
        editandoArticulo: {...this.state.editandoArticulo, [e.target.name]: e.target.value}
      });
    } else {
      this.setState({
        nuevoArticulo: {...this.state.nuevoArticulo, [e.target.name]: e.target.value}
      });
    }
  }

  agregar = (e) => {
    e.preventDefault();
    var temp = this.state.articulos;
    temp.push(this.state.nuevoArticulo);
    this.setState({
      articulos: temp,
      nuevoArticulo: {codigo: '', nombre: '', apellido: '', email: '', celular: '', acciones: ''}
    });
    localStorage.setItem('articulos', JSON.stringify(temp));
  }

  editar = (e) => {
    e.preventDefault();
    var temp = this.state.articulos.map(articulo => 
      articulo.codigo === this.state.editandoArticulo.codigo ? this.state.editandoArticulo : articulo
    );
    this.setState({
      articulos: temp,
      editandoArticulo: null
    });
    localStorage.setItem('articulos', JSON.stringify(temp));
  }

  iniciarEdicion = (articulo) => {
    this.setState({
      editandoArticulo: {...articulo}
    });
  }

  borrar(cod) {
    var temp = this.state.articulos.filter((el) => el.codigo !== cod);
    this.setState({
      articulos: temp
    });
    localStorage.setItem('articulos', JSON.stringify(temp));
  }  

  render() {
    return (
      <div>
        <h2 class="text-center fw-bold">Agenda de Contactos</h2>
        <hr class="my-4"/>
        <div class="row mb-2 container-fluid">
          <div class="col-md-3 container">
          <table class="table">
            <thead class="table-dark">
              <tr>
                <th class="text-center" colspan="2">Formulario</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="2">
                <form onSubmit={this.state.editandoArticulo ? this.editar : this.agregar}>
                  <div class="form-group">
                    <label for="codigo">Código:</label>
                    <input type="text" className="form-control" id="codigo" name="codigo" value={(this.state.editandoArticulo || this.state.nuevoArticulo).codigo} onChange={this.handleChange} required />
                  </div>
                  <div class="form-group">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" className="form-control" value={(this.state.editandoArticulo || this.state.nuevoArticulo).nombre} onChange={this.handleChange} required />
                  </div>
                  <div class="form-group">
                    <label for="apellido">Apellido:</label>
                    <input type="text" id="apellido" name="apellido" className="form-control" value={(this.state.editandoArticulo || this.state.nuevoArticulo).apellido} onChange={this.handleChange} required />
                  </div>
                  <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="text" id="email" name="email" className="form-control" value={(this.state.editandoArticulo || this.state.nuevoArticulo).email} onChange={this.handleChange} required />
                  </div>
                  <div class="form-group">
                    <label for="celular">Celular:</label>
                    <input type="number" id="celular" name="celular" className="form-control" value={(this.state.editandoArticulo || this.state.nuevoArticulo).celular} onChange={this.handleChange} required />
                  </div>
                  <button class="bg-success text-white fw-bold btn btn-block" type="submit">{this.state.editandoArticulo ? 'Guardar' : 'Agregar'}</button>
                </form>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
          <div class="col-md-8">
            <table border="2" className="table table-striped table-bordered">
              <thead class="text-center">
                <tr>
                  <th>Código</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Email</th>
                  <th>Celular</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody class="text-center">
                {this.state.articulos.map(elemento => {
                  return (
                    <tr key={elemento.codigo}>
                      <td>{elemento.codigo}</td>
                      <td>{elemento.nombre}</td>
                      <td>{elemento.apellido}</td>  
                      <td>{elemento.email}</td>              
                      <td>{elemento.celular}</td>              
                      <td>
                        <button class="bg-danger text-white fw-bold btn btn-block" onClick={()=>this.borrar(elemento.codigo)}>Borrar</button>
                        <button class="bg-success text-white fw-bold btn btn-block" onClick={()=>this.iniciarEdicion(elemento)}>Editar</button>
                      </td>
                    </tr>
                  )
                })}    
              </tbody>    
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default App;