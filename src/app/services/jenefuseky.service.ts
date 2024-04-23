import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JenefusekyService {
  jenaFusekiUrl = 'http://localhost:3030/folongemerson/query';
  constructor(private http: HttpClient) { }
  public getAllFood() {
    return this.executeQuery(completfoodList);
  }
  public getclass() {
    return this.executeQuery(classquery);
  }

  public getSubClass() {
    return this.executeQuery(subclassquery);
  }

  public getFoodNames() {
    return this.executeQuery(foodNames);
  }

  public getAssertions() {
    return this.executeQuery(assertionquery);
  }

  public getFoodList() {
    return this.executeQuery(completfoodList);
  }
  public getComposition() {
    return this.executeQuery(compositionquery);
  }

  public getInstance() {
    return this.executeQuery(`
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX fo: <http://www.semanticweb.org/folong201/ontologies/2024/3/untitled-ontology-9#>

    SELECT ?foodInstance
    WHERE {
      ?foodInstance rdf:type fo:Food.
    }`);
  }

  public queryByFoodName(foodName: string) {
    return this.executeQuery(`
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX fo: <http://www.semanticweb.org/folong201/ontologies/2024/3/untitled-ontology-9#>

    SELECT ?food ?name ?image
    WHERE {
      ?food rdf:type fo:Food ;
            fo:name "${foodName}" ;
            fo:image ?image .
    }`);
  }

  public getFoodComponentByName(name:string){ 



    return this.executeQuery(`
     PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX fo: <http://www.semanticweb.org/folong201/ontologies/2024/3/untitled-ontology-9#>
      SELECT ?component ?ingredient
      WHERE {
        ?food rdf:type fo:Food ;
            fo:name "${name}" ;
            fo:hasComponent ?component ;
            fo:hasIngradient ?ingredient .
      }`)
  }

  public completeQuery(query: string) {
    return this.executeQuery(query);
  }



  createFood(food: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/sparql-update');

    const query = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX fo: <http://www.semanticweb.org/folong201/ontologies/2024/3/untitled-ontology-9#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    INSERT DATA {
      fo:bouille rdf:type fo:Food ;
                 fo:name "${food.name}" ;
                 fo:image "${food.image}" .
    }
  `;

    return this.http.post("http://localhost:3030/folongemerson/update", query, { headers });
  }




  private executeQuery(query: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const params = new HttpParams().set('query', query);
    return this.http.get(this.jenaFusekiUrl, { headers, params });
  }

}

//pour recuperer les assersions
const assertionquery = `
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX fo: <http://localhost:3030/folongemerson#>

          SELECT ?subject ?predicate ?object
          WHERE {
            ?subject ?predicate ?object
          }

  `;
//pour recuperer les classes
const classquery = `
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?class ?label ?description
WHERE {
  ?class a owl:Class.
  OPTIONAL { ?class rdfs:label ?label}
  OPTIONAL { ?class rdfs:comment ?description}
}
`;
//recuperer les sous classes.
const subclassquery = `
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

  SELECT DISTINCT ?subclass ?label ?description
  WHERE {
    ?subclass rdfs:subClassOf ?parent .
    ?subclass rdf:type owl:Class .
    OPTIONAL { ?subclass rdfs:label ?label }
    OPTIONAL { ?subclass rdfs:comment ?description }
  }`;

//recuperer les food
const foodNames = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX fo: <http://www.semanticweb.org/folong201/ontologies/2024/3/untitled-ontology-9#>

SELECT ?foodInstance
WHERE {
  ?foodInstance rdf:type fo:Food.
}`;

//recuperer les food et leur informations
const completfoodList = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX fo: <http://www.semanticweb.org/folong201/ontologies/2024/3/untitled-ontology-9#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?food ?name ?image
WHERE {
  ?food rdf:type fo:Food ;
        fo:name ?name ;
        fo:image ?image .
}
`;

const compositionquery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX fo: <http://www.semanticweb.org/folong201/ontologies/2024/3/untitled-ontology-9#>

SELECT ?food ?component ?ingradient
WHERE {
  ?food rdf:type fo:Food ;
       fo:hasComponent ?component ;
       fo:hasIngradient ?ingradient .
}
`;
const foodComponentandingredient = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX fo: <http://www.semanticweb.org/folong201/ontologies/2024/3/untitled-ontology-9#>
SELECT ?component ?ingredient
WHERE {
  ?food rdf:type fo:Food ;
       fo:name "${name}" ;
       fo:hasComponent ?component ;
       fo:hasIngradient ?ingredient .
}`
