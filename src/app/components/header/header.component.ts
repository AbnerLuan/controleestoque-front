import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isMenuCollapsed = true;

  constructor(private service: AuthService,
    private toast: ToastrService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    
  }

  logout() {
    this.service.logout();
    this.toast.info('Logout com sucesso', 'Logout', { timeOut: 8000 });  
    this.router.navigate(['login']);    
  }

}
