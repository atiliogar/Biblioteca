import {pool} from './database.js';

class LibroController{

	async getAll(req, res) {
        try {
		const [result] = await pool.query('SELECT * FROM libros');
		res.json(result);
    } catch (error) {
        res.status(500).json({"Error": "Ocurrió un error al obtener los libros"});
        }
    }

async add(req, res){ 
    try {
         const libro = req.body; 
         const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, aniopublicacion, ISBN) VALUES(?,?,?,?,?)`, [libro.nombre, libro.autor, libro.categoria, libro.aniopublicacion, libro.ISBN]); 
         res.json({"Libro insertado exitosamente": result.insertId});
     } catch (error) {
        res.status(500).json({"Error": "Ocurrió un error al obtener el libro"});
    }
     }

    async delete(req, res){
        try {
        const libro = req.body;
        const [result] = await pool.query("DELETE FROM libros WHERE ISBN=(?)", [libro.ISBN]);
        if (result.affectedRows > 0) {
        res.json({"Libro con ISBN eliminado exitosamente": result.affectedRows});
     } else {
        res.status(404).json({"Error": "No se encontró ningun libro con el ISBN ${libro.ISBN}" });
    }
    } catch (error) {
        res.status(500).json({"Error": "Ocurrió un error al eliminar el libro" });
      }
  }


    async getOne(req,res){
        try {
        const id = req.body.id;
        const [result] = await pool.query('SELECT * FROM libros WHERE id = ?', [id]);
        if(result.length > 0) {
            res.json(result[0]);
        }else {
            res.status(404).json({"Error": `No se encontro el libro con el id ${id}`});
        }
      } catch (error) {
        res.status(500).json({"Error": "Ocurrió un error al obtener el libro"});
      }
    }

    async update(req, res){
        try {
        const libro = req.body;
        const [result] = await pool.query("UPDATE libros SET nombre=(?), autor=(?), categoria=(?), aniopublicacion=(?), ISBN=(?) WHERE ISBN=(?)", [libro.nombre, libro.autor, libro.categoria, libro.aniopublicacion, libro.ISBN, libro.ISBN]);
        if (result.affectedRows > 0) {
        res.json({"Libro con ISBN actualizado exitosamente": result.affectedRows });
    } else {
        res.status(404).json({"Error": "No se encontró ningun libro con el ISBN ${libro.ISBN}" });
    }
    } catch (error) {
        res.status(500).json({"Error": "Ocurrió un error al actualizar el libro" });
    }
    }
} 


        export const libro = new LibroController();