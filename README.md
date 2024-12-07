# temp example

`const routes: Routes = [
  {
    path: 'example',
    component: ExampleComponent,
    resolve: {
      data: () => {
        return forkJoin({
          data1: this.apiService.getDataFromApi1(),
          data2: this.apiService.getDataFromApi2(),
          data3: this.apiService.getDataFromApi3()
        });
      }
    }
  }
];
`
