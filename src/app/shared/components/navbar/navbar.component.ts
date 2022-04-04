import { Component, OnInit } from '@angular/core';
import { faShoppingCart, faBars, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { StoreService } from '../../services/store.service';
import { User } from '../../dtos/user';
import { AuthService } from '../../services/auth.service';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faShoppingCart = faShoppingCart;
  faBars = faBars;
  faTimesCircle = faTimesCircle

  activeSidebar = false;
  countProducts: number = 0;

  profile: User | null = null;
  img_tmp_avatar = 'assets/images/avatar.png';

  constructor(private storeService: StoreService,
              private authService: AuthService,
              private fileService: FileService) { }

  ngOnInit(): void {
    // Suscribirnos al Observable del carrito de compras 
    // Para determinar cuantos productos hay actualmente dentro del carrito de forma REACTIVA
 
    // Si bien existe un método en el servicio para saber eso, en este caso al suscribirse pordemos obtener lo mismo pero con la logica declarada en este componente (subscritor)
    this.storeService.myShoppingCart$.subscribe(products => {
      this.countProducts = products.length;
    });
    this.isLogged();
  }

  // Ocultar o mostrar el sidebar en modo mobile
  toggleSidebar() {
    this.activeSidebar = !this.activeSidebar;
  }

  isLogged() {
    this.profile = this.authService.isLogged();
  }

  // Este método se ejecutará si el control de tipo File cambia en su contenido
  uploadFile(event: Event) {
    let fileInputControl = event.target as HTMLInputElement;
    // Recuperar el archivo adjunto en el control de tipo File
    const file = fileInputControl.files?.item(0);
    this.fileService.uploadFile(file!).subscribe(upload => {
      this.img_tmp_avatar = upload.location;
      console.log(upload);
    });
  }

}
