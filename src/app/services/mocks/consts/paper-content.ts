import { PaperContent } from "../../../pages/platform/pages/paper-detail-page/paper-detail.model";

export const MockPapersContent: PaperContent = {
  uid: 'HJlk39na9e',
  id: 'paper-001',
  title: 'Understanding Angular Services: Architecture, State Management, and Scalable Application Design',
  abstract: `
    Angular services are one of the central architectural building blocks of modern Angular applications.
    They provide a mechanism for sharing logic, data, configuration, and application-level behaviour across
    components while supporting dependency injection, modularity, and testability.

    This paper explores Angular services from both a conceptual and practical perspective. It begins by
    explaining what services are and why they matter in component-based architecture. It then examines the
    relationship between services, dependency injection, state management, HTTP communication, application
    configuration, and domain-driven front-end design.

    The paper argues that well-designed services allow Angular applications to remain maintainable as they
    scale. Poorly designed services, however, can become dumping grounds for unrelated logic, creating hidden
    coupling and long-term technical debt. Through examples, patterns, and architectural recommendations,
    this paper presents a structured approach to designing Angular services for real-world applications.
  `,
  chapters: [
    {
      id: 'chapter-001',
      title: 'Introduction to Angular Services',
      sections: [
        {
          id: 'section-001',
          title: 'What are Angular Services?',
          content: `
            Angular services are TypeScript classes that encapsulate reusable logic, data access, state,
            or behaviour that can be shared across different parts of an Angular application. Unlike components,
            which are primarily responsible for presenting data and handling user interaction, services are
            intended to contain logic that does not directly belong in the view layer.

            In practice, services are often used for tasks such as fetching data from APIs, storing application
            state, performing calculations, managing authentication, coordinating cross-component communication,
            or abstracting access to browser APIs such as local storage.

            A service becomes especially powerful when it is combined with Angular's dependency injection system.
            Instead of manually creating service instances, Angular can provide them wherever they are needed.
            This encourages loose coupling between classes and makes it easier to test individual parts of the
            application in isolation.
          `
        },
        {
          id: 'section-002',
          title: 'Why Use Services?',
          content: `
            Services help keep Angular components focused on their main responsibility: controlling the view.
            Without services, components can quickly become bloated with business logic, API calls, formatting
            rules, state transitions, and validation logic. This makes components harder to read, harder to test,
            and harder to reuse.

            By moving shared logic into services, an application becomes easier to reason about. Components can
            ask services for data or delegate actions to them, while services can focus on implementing the actual
            behaviour. This separation of concerns is one of the foundations of maintainable Angular architecture.

            Services also support reuse. For example, a PaperService could be used by a dashboard component, a
            paper detail page, a review queue, and a reporting screen. Each component may display the data
            differently, but the underlying logic for retrieving, updating, and transforming paper records can
            remain centralised.
          `
        },
        {
          id: 'section-003',
          title: 'Services in the Angular Architecture',
          content: `
            Angular applications are usually built from components, templates, directives, pipes, services,
            and routing modules. Within this structure, services act as the connective tissue between the
            presentation layer and the underlying application behaviour.

            A typical component should not need to know how data is fetched, where it is cached, how errors are
            handled, or how API payloads are transformed into view models. These responsibilities can be delegated
            to services. This allows the component to remain declarative and focused on rendering state.

            In larger applications, services may also be divided by responsibility. For example, an application
            may have API services, facade services, state services, utility services, and domain services. Each
            category serves a different architectural purpose and helps prevent a single service from becoming
            too large or too vague.
          `
        }
      ]
    },
    {
      id: 'chapter-002',
      title: 'Creating and Providing Services',
      sections: [
        {
          id: 'section-004',
          title: 'Creating a Service with the Angular CLI',
          content: `
            Angular services can be created manually, but the Angular CLI provides a convenient command for
            generating the basic structure:

            ng generate service services/paper

            This creates a TypeScript file containing a class decorated with @Injectable. The @Injectable
            decorator tells Angular that the class can participate in dependency injection. Most generated
            services include providedIn: 'root', which means Angular will provide a singleton instance of the
            service at the root application level.

            Using the CLI also helps keep file naming and project structure consistent. In a growing codebase,
            this consistency becomes increasingly valuable because developers can quickly understand where
            different kinds of logic are expected to live.
          `
        },
        {
          id: 'section-005',
          title: 'The @Injectable Decorator',
          content: `
            The @Injectable decorator marks a class as available for dependency injection. The most common
            configuration is providedIn: 'root'. This tells Angular to create one shared instance of the service
            for the entire application.

            A root-provided service is useful when the service represents global application logic or shared
            state. Examples include authentication services, user preference services, notification services,
            configuration services, and application-wide data stores.

            Services can also be provided at a component level. In that case, Angular creates a new instance of
            the service for that component and its child component tree. This can be useful when each instance
            of a component needs its own isolated service state.
          `
        },
        {
          id: 'section-006',
          title: 'Injecting Services into Components',
          content: `
            Services are injected into components through Angular's dependency injection system. Traditionally,
            this was done through the constructor. In newer Angular applications, the inject() function is also
            commonly used.

            For example, a component may inject a PaperService and call a method such as getPapers() to retrieve
            a list of papers. The component does not need to know whether the data comes from a mock object,
            Firebase, REST API, local storage, or another source. That decision is hidden behind the service
            boundary.

            This abstraction is one of the main benefits of services. It allows implementation details to change
            without requiring major changes to the component that consumes the service.
          `
        }
      ]
    },
    {
      id: 'chapter-003',
      title: 'Service Responsibilities and Design Principles',
      sections: [
        {
          id: 'section-007',
          title: 'Single Responsibility in Services',
          content: `
            A well-designed service should have a clear responsibility. When a service tries to do too many
            unrelated things, it becomes difficult to test, difficult to maintain, and difficult to reuse.

            For example, a PaperService should probably manage paper-related operations such as loading papers,
            creating papers, updating metadata, and retrieving paper content. It should not also manage user
            authentication, notification preferences, billing, or UI layout settings.

            When services begin to grow too large, it is often a sign that responsibilities should be split.
            For example, PaperApiService, PaperStateService, PaperFacadeService, and PaperExportService may each
            handle a different part of the paper workflow.
          `
        },
        {
          id: 'section-008',
          title: 'Avoiding the “God Service” Anti-Pattern',
          content: `
            One common mistake in Angular applications is creating a single large service that becomes responsible
            for everything. This is sometimes called a “God service”. It may start innocently as a general utility
            or data service, but over time it accumulates unrelated logic.

            God services create hidden dependencies across the application. A change made for one feature can
            accidentally break another because both features rely on the same overloaded service. This makes the
            codebase fragile and discourages refactoring.

            A better approach is to create smaller, focused services with clear names and boundaries. If a service
            name becomes vague, such as AppService or SharedService, it may be worth reconsidering whether the
            service is too broad.
          `
        },
        {
          id: 'section-009',
          title: 'Naming Services Clearly',
          content: `
            Service names should communicate their responsibility. Names such as AuthService, PaperService,
            ReviewQueueService, StorageService, and NotificationService are easier to understand than vague names
            such as DataService or HelperService.

            In larger applications, naming can also indicate architectural role. For example, a service ending in
            ApiService may be responsible for HTTP communication, while a service ending in FacadeService may be
            responsible for presenting a simplified interface to components.

            Clear naming helps new developers understand the structure of the codebase more quickly. It also makes
            it easier to decide where new logic belongs.
          `
        }
      ]
    },
    {
      id: 'chapter-004',
      title: 'Services and State Management',
      sections: [
        {
          id: 'section-010',
          title: 'Local State versus Shared State',
          content: `
            Not all state belongs in a service. Some state is purely local to a component, such as whether a
            dropdown is open or which tab is currently selected. This kind of state can often remain inside the
            component.

            Shared state, however, is different. If multiple components need access to the same data or need to
            respond to changes in that data, a service is often a better place to manage it. For example, the
            selected paper, the current workspace, the authenticated user, or a list of active notifications may
            all be shared across multiple components.

            The key question is whether the state is part of the component's private UI behaviour or part of the
            broader application model. Services are best suited to the latter.
          `
        },
        {
          id: 'section-011',
          title: 'Using Signals in Angular Services',
          content: `
            Modern Angular applications can use signals to manage reactive state. Signals allow services to expose
            values that update automatically when their underlying state changes. This can reduce boilerplate and
            make state changes easier to follow.

            A service might store a list of papers in a writable signal and expose a readonly version to components.
            Components can then render the value while the service remains responsible for updating it.

            Signals are especially useful for UI state, derived values, and application-level state that does not
            require a full external state management library. They can also be combined with computed values to
            derive filtered lists, counts, progress metrics, or dashboard summaries.
          `
        },
        {
          id: 'section-012',
          title: 'Using Observables in Services',
          content: `
            Observables remain important in Angular, especially for asynchronous streams such as HTTP requests,
            route parameters, form value changes, and event streams. Many Angular APIs continue to use RxJS,
            and services often expose observable streams to components.

            A common pattern is for a service to make an HTTP request and return an Observable. The component can
            then subscribe through the async pipe or convert the stream into a signal where appropriate.

            Observables are powerful when dealing with time-based, cancellable, or multi-emission data. Signals
            are often simpler for synchronous state. In real applications, both approaches may be used together.
          `
        }
      ]
    },
    {
      id: 'chapter-005',
      title: 'Services and HTTP Communication',
      sections: [
        {
          id: 'section-013',
          title: 'Using Services for API Calls',
          content: `
            API communication is one of the most common uses for Angular services. Instead of placing HTTP calls
            directly inside components, developers usually create dedicated services that communicate with the
            backend.

            For example, a PaperApiService may include methods such as getAllPapers(), getPaperById(),
            createPaper(), updatePaper(), and deletePaper(). Each method can wrap an HTTP request and return a
            typed result.

            This approach keeps the component cleaner and allows API details to be centralised. If the backend
            endpoint changes, the update can usually be made inside the service without touching every component
            that uses paper data.
          `
        },
        {
          id: 'section-014',
          title: 'Transforming API Data',
          content: `
            Backend data structures do not always match the needs of the front-end view. A service can transform
            raw API responses into view models that are easier for components to consume.

            For example, an API may return timestamps, user IDs, status codes, and nested objects. The front-end
            may need formatted dates, display names, progress percentages, and grouped records. A service can
            perform this transformation before the data reaches the component.

            This reduces duplication and prevents each component from implementing its own version of the same
            formatting or mapping logic.
          `
        },
        {
          id: 'section-015',
          title: 'Error Handling in Services',
          content: `
            Services are also a good place to handle errors consistently. Instead of each component deciding how
            to respond to API failures, a service can catch errors, log them, transform them, or pass back a
            predictable error structure.

            In larger applications, error handling may be split between interceptors and services. Interceptors
            can handle cross-cutting concerns such as authentication failures or global server errors, while
            feature services can handle domain-specific errors.

            A good error strategy improves user experience because the application can provide clearer feedback
            when something goes wrong.
          `
        }
      ]
    },
    {
      id: 'chapter-006',
      title: 'Services, Facades, and Feature Architecture',
      sections: [
        {
          id: 'section-016',
          title: 'The Facade Pattern',
          content: `
            A facade service provides a simplified interface between components and more complex underlying
            services. Instead of a component injecting several services directly, it can inject one facade that
            coordinates the required operations.

            For example, a PaperDetailFacade may coordinate paper loading, chapter navigation, notes, references,
            autosave status, and collaboration state. The component can then interact with the facade instead of
            managing all those dependencies itself.

            This pattern is useful in complex screens where components would otherwise become overloaded with
            orchestration logic.
          `
        },
        {
          id: 'section-017',
          title: 'Feature-Level Services',
          content: `
            Feature-level services belong to a specific area of the application. For example, a review queue
            feature may have its own ReviewQueueService, ReviewAssignmentService, and ReviewDecisionService.

            Keeping services close to the feature they support makes the application easier to navigate. Developers
            working on a feature can find related logic in one place instead of searching through a large shared
            services folder.

            This approach also supports lazy loading and modular architecture, because each feature can bring its
            own services, components, routes, and models.
          `
        },
        {
          id: 'section-018',
          title: 'Shared Services versus Domain Services',
          content: `
            Shared services should be genuinely reusable across multiple features. Examples might include date
            formatting, modal coordination, file upload helpers, logging, or notification handling.

            Domain services, by contrast, represent business concepts. A PaperService, SubmissionService,
            CollaboratorService, or TaskService belongs to the application domain and should usually live close
            to that domain area.

            Confusing these categories can lead to poor structure. Not every reusable class belongs in a shared
            folder. Sometimes it is better to keep domain logic inside the domain where its meaning is clearer.
          `
        }
      ]
    },
    {
      id: 'chapter-007',
      title: 'Testing Angular Services',
      sections: [
        {
          id: 'section-019',
          title: 'Why Services are Easier to Test than Components',
          content: `
            Services are often easier to test than components because they usually do not depend directly on
            templates, DOM rendering, user events, or Angular change detection. A well-designed service contains
            plain TypeScript logic that can be tested with focused unit tests.

            This is one reason why moving business logic out of components improves testability. Instead of trying
            to test complex behaviour through the UI, developers can test the service directly.

            For example, a PaperProgressService could be tested by passing in mock paper data and verifying that
            it calculates the correct progress percentage, status summary, or deadline warning.
          `
        },
        {
          id: 'section-020',
          title: 'Mocking Dependencies',
          content: `
            When a service depends on another service, tests can provide mock versions of those dependencies.
            Angular's testing utilities allow developers to configure a testing module and replace real services
            with controlled test doubles.

            This is especially useful when testing services that depend on HTTP, authentication, storage, or
            external APIs. The test can focus on the service's behaviour without actually making network requests.

            Mocking dependencies also helps verify how services behave under failure conditions, such as API errors,
            missing data, expired sessions, or invalid user input.
          `
        },
        {
          id: 'section-021',
          title: 'Testing State Changes',
          content: `
            Services that manage state should be tested for predictable state transitions. For example, when a
            paper is selected, the selected paper signal or observable should update. When a paper is removed,
            the list should update. When loading fails, the service should expose an error state.

            These tests are valuable because state bugs can be difficult to identify visually. A component may
            render the wrong data because a service failed to update correctly or because derived state was not
            recalculated.

            Good tests help protect against regressions as the application becomes more complex.
          `
        }
      ]
    },
    {
      id: 'chapter-008',
      title: 'Common Mistakes and Best Practices',
      sections: [
        {
          id: 'section-022',
          title: 'Putting Too Much Logic in Components',
          content: `
            One of the most common Angular mistakes is allowing components to become too large. If a component
            contains API calls, state transformations, business rules, validation logic, and UI behaviour all in
            one file, it becomes difficult to maintain.

            Services provide a way to move much of this logic out of the component. The component can then focus
            on binding data to the template and responding to user interaction.

            A useful rule of thumb is that if logic would be useful outside the component, or if it is difficult
            to explain as purely presentational logic, it may belong in a service.
          `
        },
        {
          id: 'section-023',
          title: 'Creating Too Many Tiny Services',
          content: `
            While large services are a problem, the opposite extreme can also create complexity. If every small
            function becomes its own service, the application can become fragmented and difficult to follow.

            The goal is not to maximise the number of services. The goal is to create meaningful boundaries.
            A service should represent a coherent responsibility, not just a random collection of one-line helper
            methods.

            Good architecture balances separation with simplicity.
          `
        },
        {
          id: 'section-024',
          title: 'Keeping Services Framework-Aware but View-Independent',
          content: `
            Angular services can depend on Angular features such as HttpClient, inject(), signals, and dependency
            injection. However, they should generally avoid depending directly on the details of a specific
            component template.

            A service should not need to know which button was clicked, how a card is styled, or which CSS class
            is applied to a particular element. Those details belong to the component.

            Instead, the service should expose meaningful application behaviour, such as createPaper(), saveDraft(),
            assignReviewer(), publishSubmission(), or calculateProgress().
          `
        }
      ]
    },
    {
      id: 'chapter-009',
      title: 'Applied Example: Services in a Research Paper Platform',
      sections: [
        {
          id: 'section-025',
          title: 'PaperService',
          content: `
            In a research paper platform, a PaperService may be responsible for managing paper records. It could
            provide methods for retrieving papers, loading a specific paper, creating a new paper, updating paper
            metadata, archiving papers, or deleting drafts.

            This service would likely be used by the dashboard, papers list, paper detail page, and submission
            workflow. By centralising paper-related operations, the application avoids duplicating logic across
            multiple screens.

            The PaperService may also work with other services, such as PaperApiService, PaperStateService, and
            NotificationService.
          `
        },
        {
          id: 'section-026',
          title: 'PaperContentService',
          content: `
            A PaperContentService could manage the chapters, sections, abstract, and references of a paper. This
            separation is useful because paper metadata and paper content are not always the same thing.

            Metadata may include the title, authors, status, deadline, collaborators, and submission stage.
            Content includes the actual body of the paper: abstract, chapters, sections, notes, figures, tables,
            and references.

            Separating these concerns can make the application easier to scale. The papers list may only need
            metadata, while the editor or detail page needs the full content structure.
          `
        },
        {
          id: 'section-027',
          title: 'ReviewWorkflowService',
          content: `
            A ReviewWorkflowService could manage the movement of a paper through different stages, such as
            outline, drafting, internal review, revision, submission, and completion.

            This service may enforce workflow rules. For example, a paper might not be allowed to move to
            submission until required sections are complete, references are added, and collaborators have approved
            the draft.

            Workflow services are useful because they prevent important process logic from being scattered across
            buttons, forms, and page components.
          `
        },
        {
          id: 'section-028',
          title: 'CollaborationService',
          content: `
            A CollaborationService could manage shared access, collaborator roles, invitations, comments, and
            activity history. In a multi-user academic platform, collaboration logic can become complex very
            quickly.

            Different collaborators may have different permissions. One user may be allowed to edit the paper,
            another may only comment, and another may approve changes. A dedicated service can help keep those
            rules centralised.

            The service may also expose recent activity, such as who edited a section, who added a reference, or
            who changed the review status.
          `
        }
      ]
    },
    {
      id: 'chapter-010',
      title: 'Conclusion',
      sections: [
        {
          id: 'section-029',
          title: 'Summary of Findings',
          content: `
            Angular services are essential for building scalable, maintainable, and testable applications. They
            allow developers to separate presentation logic from application behaviour, centralise shared logic,
            and create clearer architectural boundaries.

            Services are most effective when they have focused responsibilities, clear names, and well-defined
            relationships with components and other services. They should not become dumping grounds for unrelated
            logic, nor should they be fragmented into unnecessarily tiny abstractions.

            In modern Angular applications, services can work with dependency injection, signals, observables,
            HTTP clients, facades, and feature-level architecture to support robust application design.
          `
        },
        {
          id: 'section-030',
          title: 'Final Recommendation',
          content: `
            Developers should treat services as architectural tools rather than simply as convenient places to
            put shared functions. A good service design can make an Angular application easier to extend, easier
            to test, and easier to understand.

            For applications such as academic writing platforms, research dashboards, workflow systems, or content
            management tools, services provide the structure needed to manage complex data and behaviour across
            multiple screens.

            As Angular continues to evolve, services remain one of the most important mechanisms for creating
            clean, modular, and scalable front-end applications.
          `
        }
      ]
    }
  ],
  references: [
    {
      id: 'ref-001',
      title: 'Angular Documentation - Services and Dependency Injection',
      authors: ['Angular Team'],
      publicationYear: 2024,
      doi: '10.1234/angular.services'
    },
    {
      id: 'ref-002',
      title: 'Dependency Injection Patterns in Component-Based Web Applications',
      authors: ['M. Fowler', 'L. Richardson'],
      publicationYear: 2021,
      doi: '10.5678/di.component.patterns'
    },
    {
      id: 'ref-003',
      title: 'Scalable Front-End Architecture with Angular',
      authors: ['Jane Smith', 'Robert Klein'],
      publicationYear: 2022,
      doi: '10.9012/frontend.architecture'
    },
    {
      id: 'ref-004',
      title: 'State Management Strategies in Modern Angular Applications',
      authors: ['A. Patel', 'N. Govender'],
      publicationYear: 2023,
      doi: '10.3456/angular.state'
    },
    {
      id: 'ref-005',
      title: 'Testing Services and Dependency Graphs in TypeScript Applications',
      authors: ['Claire Johnson'],
      publicationYear: 2020,
      doi: '10.7890/typescript.testing'
    },
    {
      id: 'ref-006',
      title: 'Reactive Programming in Angular: Observables, Signals, and Application State',
      authors: ['Daniel Meyer', 'Sofia Naidoo'],
      publicationYear: 2024,
      doi: '10.1122/angular.reactive'
    },
    {
      id: 'ref-007',
      title: 'The Facade Pattern in Enterprise Front-End Systems',
      authors: ['K. Mokoena', 'T. Williams'],
      publicationYear: 2019,
      doi: '10.3344/facade.enterprise'
    },
    {
      id: 'ref-008',
      title: 'Designing Maintainable Web Applications Using Domain-Oriented Services',
      authors: ['Helen Zhou', 'Peter Adams'],
      publicationYear: 2021,
      doi: '10.5566/domain.services'
    },
    {
      id: 'ref-009',
      title: 'Anti-Patterns in Angular Application Development',
      authors: ['John Doe', 'Jane Smith'],
      publicationYear: 2022,
      doi: '10.7788/angular.antipatterns'
    },
    {
      id: 'ref-010',
      title: 'Modular Application Design for Large Angular Workspaces',
      authors: ['Angular Architecture Working Group'],
      publicationYear: 2023,
      doi: '10.9900/angular.modular'
    }
  ]
};