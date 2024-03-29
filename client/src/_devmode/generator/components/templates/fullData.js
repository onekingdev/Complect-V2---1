/* eslint max-lines-per-function: ["error", 100] */
/* eslint max-statements: ["error", 100] */

import { randomBusinesses } from "../organisms/randomBusinesses.js";
import { randomEmployees } from "../organisms/randomEmployees.js";
import { randomSpecialists } from "../organisms/randomSpecialists.js";
import { randomProjects } from "../organisms/randomProjects.js";
import { randomTasks } from "../organisms/randomTasks.js";
import { randomReviews } from "../organisms/randomReviews.js";
import { randomPolicies } from "../organisms/randomPolicies.js";
import { randomRisks } from "../organisms/randomRisks.js";
import { shuffleArray, randomNumber, randomElement } from "../atoms/utils.js";

const quantity = {
	businesses: 10,
	specialists: 30,
	projects: 50,
	tasks: 50,
	reviews: 5,
	policies: 5,
	risks: 5
};


export default function full () {
	try {
		const businesses = randomBusinesses({ q: quantity.businesses }); // option: ({byPlans: true}) - generate only 3 businesses with different plans

		// generate employees accounts for businesses
		const generateEmployees = () => {
			const maxEmployees = {
				basic: 0,
				team: 2,
				business: 9
			};
			const employees = [];
			businesses.forEach( business => employees.push( ...randomEmployees({
				q: [0, maxEmployees[business.plan]],
				id: business.businessId
			}) ) );
			return employees;
		};

		const employees = generateEmployees();
		const specialists = randomSpecialists({ q: quantity.specialists });

		
		const users = [...businesses, ...employees, ...specialists];
		
		// get all users ID
		const usersId = users.map( user => user._id );
		const businessesId = businesses.map( business => business.businessId );


		// generate Projects and assign creator and collaborators
		const projects = randomProjects({ q: quantity.projects });
		projects.forEach( ( project ) => {
			const collaborators = shuffleArray( users );
			project.creator = {
				_id: collaborators[0]._id,
				firstName: collaborators[0].firstName,
				lastName: collaborators[0].lastName,
				avatar: collaborators[0].avatar,
			}
			for ( let i = 1; i < randomNumber(0,10); i++ ) project.collaborators.push({
				_id: collaborators[i]._id,
				firstName: collaborators[i].firstName,
				lastName: collaborators[i].lastName,
				avatar: collaborators[i].avatar,
				userRole: randomElement(["basic", "trusted", "admin"])
			});

			for ( let i = 1; i < randomNumber(0,5); i++ ) project.tasks.push({
				_id: "123"
			});
		});


		// generate Tasks, assign it to User and link to Projects, Polisies, Reviews or Exam
		const tasks = randomTasks({ q: quantity.tasks });
		tasks.forEach( ( task ) => {
			const business = shuffleArray( businessesId );
			const users = shuffleArray( usersId );
			const links = shuffleArray( projects );
			task.businessId = business[0];
			task.linkedTo = links[0]._id;
			task.assigneeTo = users[0][0];
		});
		return {
			// businesses,
			// employees,
			// specialists,
			projects,
			tasks,
			reviews: randomReviews({ q: quantity.reviews }),
			policies: randomPolicies({ q: quantity.policies }),
			risks: randomRisks({ q: quantity.risks })
		};
	} catch ( error ) {
		console.error( error );
	}
}
