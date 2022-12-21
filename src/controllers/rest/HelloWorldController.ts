import {Controller} from "@tsed/di";
import { OnSerialize } from "@tsed/json-mapper";
import {CollectionOf, Generics, Get, Property, Returns} from "@tsed/schema";

@Generics('T')
class PagedModel<T> {
  @CollectionOf('T')
  data: T[]
}

class PeopleResponse {
  @Property()
  id: string

  @OnSerialize(v => v?.toUpperCase())
  name: string
}

class StrictPageModel {
  @CollectionOf(PeopleResponse)
  data: PeopleResponse[]
}

@Controller("/hello-world")
export class HelloWorldController {
  @Get("/bad")
  @Returns(200, PagedModel).Of(PeopleResponse)
  get() {
    return {
      data: [{
        id: 'foo',
        name: 'bar'
      }]
    }
  }

  @Get("/good")
  @Returns(200, StrictPageModel)
  getSuccess() {
    return {
      data:
        [{
        id: 'foo',
        name: 'bar'
      }]
    }
  }
}
