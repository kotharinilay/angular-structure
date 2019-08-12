import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatSnackBar } from '@angular/material';

import { UserService, AuthService } from 'src/app/core/services';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;
  currentElement: any;
  statusText: string
  isActive: boolean;
  userId: any;
  user = {
    userId: this.userId,
    isDelete: true
  }
  ELEMENT_DATA: Element[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'emailAddress', 'status', 'action'];
  dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private router: Router, private userMgmtService: UserService,
    public matDialog: MatDialog, private snackBar: MatSnackBar,
    private authService: AuthService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.GetUsers();
  }

  setStatusText(user: any) {
    user.statusText = user.isActive ? 'Active' : 'Inactive';
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteDialog(templateRef: TemplateRef<any>) {
    this.matDialog.open(templateRef);
  }

  statusDialog(templateRef: TemplateRef<any>) {
    this.matDialog.open(templateRef);
  }

  openDialogWithoutRef() {
    this.matDialog.open(this.secondDialog);
  }

  // navigateToAddUser() {
  //   this.router.navigate(['./add']);
  // }

  // navigateToEditProfile() {
  //   this.router.navigate(['./edit-profile']);
  // }

  GetUsers() {
    const companyId = localStorage.getItem('clientId');
    this.userMgmtService.getUsers(companyId).subscribe(response => {
      if (response['StatusCode'] === 200) {
        this.dataSource.data = response['Result'].resultList;
        this.dataSource.data.forEach(element => {
          this.setStatusText(element)
        });
      }
    });
  }

  DeleteUser() {
    this.userMgmtService.deleteUser(this.userId).subscribe(response => {
      if (response['StatusCode'] === 200) {
        this.snackBar.open('User is deleted Successfully!!', 'Success', {
          duration: 2500,
          verticalPosition: 'top'
        });
        this.GetUsers();
        this.matDialog.closeAll();
      }
    })
  }

  ChangeStatus(user: any) {
    if (!user.isActive) {
      const status = {
        userId: user.userId,
        isActive: true
      }
      this.userMgmtService.changeUserStatus(status).subscribe(response => {
        user.isActive = true;
        this.setStatusText(user);
        this.snackBar.open('User is Active Successfully!!', 'Success', {
          duration: 2500,
          verticalPosition: 'top'
        });

      });
    } else if (user.isActive) {
      const status = {
        userId: user.userId,
        isActive: false
      }
      this.userMgmtService.changeUserStatus(status).subscribe(response => {
        user.isActive = false;
        this.setStatusText(user);
        this.snackBar.open('User is Inactive Successfully!!', 'Success', {
          duration: 2500,
          verticalPosition: 'top'
        });

      });
    }
    this.matDialog.closeAll();
  }

  clearLocalStorage() {
    this.authService.logout();
    this.router.navigate(['./login']);
  }
}
