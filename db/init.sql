CREATE TABLE company_details (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    founded_date DATE,
    website TEXT,
    industry TEXT,
    revenue NUMERIC(12,2),
    headquarters TEXT
);


CREATE TABLE company_employees (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES company_details(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    title TEXT,
    salary NUMERIC(12,2),
    hire_date DATE
);

INSERT INTO company_details (name, founded_date, website, industry, revenue, headquarters) VALUES
    ('Company A', '2022-01-01', 'www.company-a.com', 'Technology', 100000000, 'New York'),
    ('Company B', '2022-02-01', 'www.company-b.com', 'Retail', 200000000, 'London'),
    ('Company C', '2022-03-01', 'www.company-c.com', 'Finance', 300000000, 'Paris');

INSERT INTO company_employees (company_id, name, title, salary, hire_date) VALUES
    (1, 'Employee A', 'Manager', 80000, '2022-01-01'),
    (1, 'Employee B', 'Developer', 75000, '2022-02-01'),
    (2, 'Employee C', 'Director', 100000, '2022-03-01'),
    (3, 'Employee D', 'Accountant', 65000, '2022-04-01');
